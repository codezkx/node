import { PipelineManagerOptions } from './middlewares/bff-server/middlewares/pipeline.ts'
declare global {
  namespace Express {
    interface Request{
      pipeline: PipelineManagerOptions;  // 👈 扩展 Request 接口
    }
  }
}