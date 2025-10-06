/**
 * 接口聚合中间件
 * 
 */

import axios from 'axios';
import type { NextFunction, Request, Response, } from 'express';
import type { PipelineResult } from './pipeline';

export interface ParamsDictionary {
    [key: string]: any;
}

export interface ContextOptions {
  req: Request;
  params: ParamsDictionary;
  query: any;
  body: any;
  pipelineGroup?: string
  [key: string]: any;

}

type MapParams = {
  params: ParamsDictionary
}

export interface RequestOptions {
  service: string,
  endpoint: string,
  method: string,
  transform?: (data: any, context?: ContextOptions) => any,
  mapParams?: (context: ContextOptions) => MapParams,

}

interface ResponseOptions extends RequestOptions {
  metadata: {
    [key: string]: any
  }
  [key: string]: any
}

type RequestFun = {
  name: string,
  request: (context: ContextOptions) => RequestOptions
}

type Requests = RequestFun[]

export interface AggregationConfigs {
  maxConcurrent: number,
  pipelineGroup: string,
  requests: Requests
}

type ServiceOptions = {
  baseURL: string,
  headers: ParamsDictionary
}

interface Result {
  [key: string]: any
}

/**
 * 聚合服务
 */
class AgggregatorMiddleware {

  services: Map<string, ServiceOptions>;
  constructor() {
     this.services = new Map();
  }

  // 注册服务
  registerService(name: string, service: ServiceOptions) {
    this.services.set(name, service)
  }
  
  // 创建聚合中间件
  createAggregator(aggregationConfig: AggregationConfigs) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { pipelineGroup, maxConcurrent = 3, requests } = aggregationConfig;
        const context = { req, params: req.params, query: req.query, body: req.body };
        const options = {
          maxConcurrent
        }
        // 添加任务到管道
        requests.forEach(task => {
          const { name, request } = task
          req.pipeline.addTask(
            pipelineGroup,
            name,
            async (context: ContextOptions) => {
              return await this.executeRequest(request(context), context)
            },
            options,
          );
        });

        // 执行管道
        const results = await req.pipeline.executePipeline<any>(pipelineGroup, context);
        console.log(results, 'results')
        // 构建响应
        const response = this.buildResponse(requests, results, context);
        res.json(response);
      } catch (error: any) { 
        console.error('Aggregation failed:', error);
        res.status(500).json({ 
          error: 'Aggregation failed', 
          message: error.message 
        });
      }
    }
  }

  /**
   * 执行HTTP请求
   * @param request - 请求配置选项，包含服务名、端点、方法等信息
   * @param context - 上下文选项，用于参数映射和数据转换
   * @returns Promise<any> 返回处理后的响应数据
   */
  async executeRequest(request: RequestOptions, context: ContextOptions) {
    const { service, endpoint, method = 'GET', mapParams, transform } = request;
    // 根据不同服务获取对应的配置
    const serviceConfig = this.services.get(service);
    if (!serviceConfig) {
      throw new Error(`Service ${service} not found`);
    }

    // 构建URL和参数
    const url = `${serviceConfig.baseURL}${endpoint}`;
    const params = mapParams ? mapParams(context) : {};

    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        // ...serviceConfig.headers
      },
      ...params
    };

    try {
      const response = await axios(config);
      let { data } = response.data;
      if (transform) {
        data = transform(data, context);
      }
      return data;
    } catch(error: any) {
      throw new Error(`Service ${service} request failed: ${error.message}`);
    }
  }

  /**
   * 构建响应对象
   * @param requests - 请求对象数组
   * @param results - 结果数组
   * @param context - 上下文对象
   * @returns 构建的响应对象
   */
  buildResponse(requests: Requests, results: PipelineResult[], context: ContextOptions) {
    const response: Partial<ResponseOptions> = {};
    requests.forEach((request, index: number) => {
      response[request.name] = results[index];
    });

    response.metadata = {
      timestamp: new Date().toISOString(),
      pipeline: context.pipelineGroup,
      requestCount: requests.length
    };
    return response;
  }

}

const aggregation = new AgggregatorMiddleware();

// 注册示例服务
aggregation.registerService('userService', {
  baseURL: 'http://127.0.0.1:4000',
  headers: { 'Authorization': 'Bearer token' }
});

aggregation.registerService('productService', {
 baseURL: 'http://127.0.0.1:5000',
  headers: { 'Authorization': 'Bearer token' }
});

export default aggregation;