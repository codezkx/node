import utils from '../utils.js'
const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined'

const xmlHttp = isXHRAdapterSupported && function (config) {
    return new Promise((resolve, reject) => {
        const method = (config.method || 'GET').toUpperCase();
        const timeout = config.timeout || 0;
        const responseType = config.responseType || 'json';
        let requestData = config.data || {};
        let _url = config.url;
        config.url = utils.formatParams(config.url, config.params);
        if (config.baseURL) {
            _url = config.baseURL + config.url;
        }
        const xhr = new XMLHttpRequest();

        // 允许在向服务器发送前，修改请求数据
        if (['PUT', 'POST', 'PATCH'].includes(method)) {
            const transformRequest = config.transformRequest
            if (transformRequest) {
                requestData = config.transformRequest(requestData, config.headers)
            }
        }
        if (['GET'].includes(method)) {
            const params = utils.formatQuery(config.requestData);//config.requestData请求的数据
            const requestUrl = _url + '?' + params 
            xhr.open(method, requestUrl, true);
        } else if (['PUT', 'POST', 'DELET', 'PATCH'].includes(method)) {
            xhr.open(method, _url, true);
        }

        xhr.timeout = config.timeout || timeout;

        xhr.setRequestHeader('Accept', '*/*');
        xhr.setRequestHeader('content-disposition', 'form-data; name="image"; filename="1.png"');
        xhr.setRequestHeader('content-type', 'application/json, multipart/form-data, image/png');
        // 设置请求头
        const headers = Object.keys(config.headers || {});
        if (utils.realArray(headers)) {
            headers.forEach(key => {
                xhr.setRequestHeader(key, config.headers[key]);
            })
        }
        // 请求完成触发
        function onloadend() {
            if (!xhr) {
                return false;
            }
            // 准备响应
            // const response
            const responseData = !responseType || responseType === 'text' || responseType === 'json'
                ? xhr.responseText : xhr.response;
            const response = {
                data: responseData,
                status: xhr.status,
                statusText: xhr.statusText,
                // headers: responseHeaders,
                config,
                xhr
            }
            settle(
                function _resolve(value) {
                    resolve(value)
                },
                function _reject(err) {
                    reject(err);
                },
                response
            )
            // Clean up xhr
            xhr = null; 
        }


        xhr.onreadystatechange = () => {
            if (!xhr || xhr.readyState !== 4) {
                return false;
            }
            //请求错误，我们没有得到响应，这将是
            //由onerror处理
            //除了一个例外:请求使用file: protocol，大多数浏览器
            //即使请求成功，也会返回状态0
            if (xhr.status === 0 && !(xhr.responseURL && xhr.responseURL.indexOf('file:') === 0)) {
                return;
            }
            // 在下一个事件循环（tick）中调用 onloadend 方法。
            // setTimeout()
        }
        // setTimeout(function () {
        //     if (xhr.readyState !== 4) {
        //         xhr.abort();
        //     }
        // }, config.timeout);
        xhr.timeout = (e) => {
            let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
            new Error(timeoutErrorMessage)
            xhr = null;
        }
        // xhr.send(JSON.stringify(requestData || null));
        xhr.send(requestData);

    })
}

export default xmlHttp