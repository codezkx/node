/**
 *  管道管理中间件 
 * 
 * 
 */

import type { Request, Response } from "express";
import { getPipelineGroup, type Task } from "../utils/concurrent.ts";
import type { NextFunction } from "express";
import type { ContextOptions } from "./aggregator.ts";

interface PipelineOptions {
  id: string,
  maxConcurrent: number,
  timeout: number,
  tasks: Array<Task>,
}

export interface PipelineResult<T = any> {
  data: T;
  success: boolean;
  error?: string;
  executionTime: number;
}

export type TaskFuntion = (context: ContextOptions) => any

export interface PipelineManagerOptions {
  pipelines: Map<string, PipelineOptions>;
  createPipeline(groupId: string, config: PipelineOptions): PipelineOptions;
  addTask(groupId: string, taskName: string, taskFn: TaskFuntion, config?: Partial<PipelineOptions>): void;
  executePipeline<T extends any>(groupId: string, context: ContextOptions): Promise<PipelineResult<T>[]>
}

class PipelineManager implements PipelineManagerOptions {

  pipelines: Map<string, PipelineOptions>;
  constructor() {
    this.pipelines = new Map();
  }

  /**
   * 创建管道
   * @param groupId 
   * @param config 
   */
  createPipeline(groupId: string, config?: PipelineOptions) {
    const pipeline = {
      ...config,
      id: groupId,
      maxConcurrent: config?.maxConcurrent || 3,
      timeout: config?.timeout || 30000,
      tasks: [],
    }
    this.pipelines.set(groupId, pipeline);
    return pipeline
  }


  /**
   * 向指定的管道组中添加任务
   * @param groupId 管道组ID，用于标识任务所属的管道组
   * @param taskName 任务名称，用于标识任务
   * @param taskFn 任务执行函数，实际执行任务逻辑的函数
   * @param config 管道配置选项，用于创建新管道时的配置参数
   */
  addTask(groupId: string, taskName: string, taskFn: TaskFuntion, config?: PipelineOptions) {
    if (!this.pipelines.has(groupId)) {
      this.createPipeline(groupId, config);
    }

    const pipeline = this.pipelines.get(groupId)!;
    pipeline.tasks.push({
      name: taskName,
      execute: taskFn,
      dependsOn: [] // 依赖关系
    })
  }

  /**
   * 执行管道
   * @param groupId 管道组ID，用于标识要执行的管道组
   * @param context 上下文选项，包含执行任务所需的上下文信息
   * @returns 返回管道执行的结果
   */
  async executePipeline<T>(groupId: string, context: ContextOptions) {
    const pipeline = this.pipelines.get(groupId);
    if (!pipeline) {
      throw new Error(`管道组${groupId}不存在`)
    }

    // 创建管道组
    const concurrentManager = getPipelineGroup(groupId, pipeline.maxConcurrent);

    const tasks = pipeline.tasks.map(task => async () => {
      try {
        const result: Promise<PipelineResult<T>[]> = await Promise.race([
          task.execute(context),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`任务 ${task.name} 超时`)), pipeline.timeout)
          )
        ]);

        // 将结果保存到上下文
        context[task.name] = result;
        return result
      } catch (error: any) {
        console.error(`[Pipeline ${groupId}] Task ${task.name} failed:`, error.message);
        throw error;
      }
    });
    
    // 执行管道
    return concurrentManager?.executeAll(tasks, groupId);
  }
}

// 创建中间件
const pipelineManager = new PipelineManager();

function pipelineMiddleware(req: Request, res: Response, next: NextFunction) {
  req.pipeline = pipelineManager;
  next();
}

export {
  pipelineMiddleware, 
  pipelineManager
}
