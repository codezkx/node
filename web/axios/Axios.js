import dispatchRequest from "./dispatchRequest.js";
import utils from '../utils.js'
class Axios {
    constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
            // 拦截器
        }
    }

    request(configOrUrl, config) {
        if (typeof configOrUrl === 'string') {
            config = config || {};
            config.url = configOrUrl;
        } else {
            config = configOrUrl || {} // 使用请求方法调用axios 如 axios.get
        }

        config = Object.assign(this.defaults, config);

        const { headers } = config;
        config.method = (config.method || this.defaults.method || 'get').toLowerCase();

        // let contextHeaders = headers && Object.assign(
        //     headers.common,
        //     headers[config.method]
        // );

        headers && utils.forEach(
            ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
            (method) => {
                delete headers[method]; // 把请求头中的请求方法删除
            }
        );

        // const requestInterceptorChain = [];
        // let synchronousRequestInterceptors = true;
        // this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        //   if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        //     return;
        //   }
    
        //   synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    
        //   requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        // });

        let promise;
        let i = 0;
        let len;

        // if (!synchronousRequestInterceptors) {
        //     const chain = [dispatchRequest.bind(this), undefined];
        //     chain.unshift.apply(chain, requestInterceptorChain);
        //     chain.push.apply(chain, responseInterceptorChain);
        //     len = chain.length;
        
        //     promise = Promise.resolve(config);
        
        //     while (i < len) {
        //         promise = promise.then(chain[i++], chain[i++]);
        //     }
        
        //     return promise;
        // }

        // len = requestInterceptorChain.length;

        let newConfig = config;
    
        i = 0;

        // while (i < len) {
        //     const onFulfilled = requestInterceptorChain[i++];
        //     const onRejected = requestInterceptorChain[i++];
        //     try {
        //         newConfig = onFulfilled(newConfig);
        //     } catch (error) {
        //         onRejected.call(this, error);
        //         break;
        //     }
        // }
        try {
            promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
            return Promise.reject(error);
        }

        // i = 0;
        // len = responseInterceptorChain.length;
        // while (i < len) {
        // promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        // }

        return promise;
    }
}

utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    Axios.prototype[method] = function (url, config) {
        return this.request(Object.assign(config || {}, {
            method,
            url,
            data: (config || {}).data
        }));
    };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(Object.assign(config || {}, {
            method,
            headers: isForm ? {
              'Content-Type': 'multipart/form-data'
            } : {},
            url,
            data
          }));
        };
    } 
    
    Axios.prototype[method] = generateHTTPMethod();
//  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
  
});

export default Axios