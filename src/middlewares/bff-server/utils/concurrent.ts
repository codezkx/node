/**
 * * 并发控制工具文件： 
 */

import type { TaskFuntion } from "../middlewares/pipeline.ts"

export interface TaskOptions {
  name: string,
  execute: TaskFuntion,
  dependsOn: any[], // 依赖关系
  retries?: number,
  timeout?: number
}

export type Task= () => Promise<Task>

interface Queue {
  task: Task,
  resolve: (value: any) => void,
  reject: (reason?: any) => void

}

interface ConcurrentManagerOptions {
  maxConcurrent?: number
  activeCount: number
  execute: (task: Task) => Promise<any>
  process: () => void
  executeAll: (tasks: Task[], groupId: string) => Promise<any>
}

class ConcurrentManager implements ConcurrentManagerOptions {
  queue: Queue[]
  activeCount: number
  maxConcurrent: number

  constructor(maxConcurrent = 5) {
    this.queue = []
    this.activeCount = 0
    this.maxConcurrent = maxConcurrent
  }

  execute(task: Task) {
    return new Promise((resolve, reject) => {
      this.queue.push({task, resolve, reject});
      this.process();
    })
  }

  /**
   * 处理队列中的任务
   * 
   * 该函数会从任务队列中取出任务并执行，支持并发控制。
   * 当正在执行的任务数达到最大并发数时，会等待已有任务完成后再继续处理。
   * 
   * @returns {Promise<void>} 返回一个空的Promise，表示处理过程的异步操作
   */
  async process() {
    // 队列为空或者正在执行任务数达到最大值
    if (this.activeCount >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }
    this.activeCount++;
    const {task, resolve, reject} = this.queue.shift()!;
    try {
      const result = await task();
      resolve(result);
    } catch(err) {
      reject(err);
    } finally{
      this.activeCount--;
      // 继续处理下一个任务
      this.process();
    }
  }

  /**
   * 批量执行任务
   * @param tasks 任务列表
   */
  executeAll(tasks: Task[], groupId = 'default') {
    return Promise.all(tasks.map(task => this.execute(task)));
  }
}

// 创建一个任务管理器
const pipelineGroups = new Map<string, ConcurrentManagerOptions>()

/**
 * 获取指定ID的管道组，如果不存在则创建一个新的管道组
 * @param groupId 管道组的唯一标识符
 * @param maxConcurrent 管道组的最大并发数，默认为5
 * @returns 返回对应ID的ConcurrentManager实例
 */
function getPipelineGroup(groupId: string, maxConcurrent = 5) {
  if (!pipelineGroups.has(groupId)) {
    pipelineGroups.set(groupId, new ConcurrentManager(maxConcurrent));
  }
  return pipelineGroups.get(groupId);
}

export {
  ConcurrentManager,
  getPipelineGroup
}
