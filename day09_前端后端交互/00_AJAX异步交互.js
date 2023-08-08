import { formatQuery } from './utils/client.js';

const ajax = function (config) {
    const xhr = new XMLHttpRequest()
    const host = 'http://127.0.0.1:3000/'
    let url = host + config.url
    const method = config.method?.toLocaleUpperCase() || 'GET'
    
    let data = null
    if (method === 'POST') {
        const params = config.data;
        if (params) {
            data = JSON.stringify(params);
        }
    }
    if (method === 'GET') {
        const query = formatQuery(config.data)
        if (query) {
            url += query
        }
    }    
    
    xhr.open(method, url, true);
    // readyState 变化时处理
    xhr.onreadystatechange = function () {
        const status = xhr.status
        const readyState = xhr.readyState
        if (readyState !== 4) {
            return
        }
        if (status === 200
            || status < 300
            || status === 304
        ) {
            const data = JSON.parse(xhr.responseText);
            config.success(data);
        } else {
            config.error && config.error()
        }
    }

    // 接收到请求数据时触发
    xhr.onloadstart = function () {
        // console.log('loadstart 接收到数据时触发')
    }

    // 请求完成
    xhr.onload = function () {
        // data = xhr.responseText
    }

    // 请求不管成功失败都出发此时间
    xhr.onloadend = function () {
        // console.log('相当于axios的finally')
    }

    // 请求接受到更多数据时，周期性触发  一般是上传文件
    xhr.onprogress = function () {
        // console.log('onprogress  周期性触发')
    } 

    // xhr.timeout = 10;

    // 超时 触发
    xhr.ontimeout = function () {
        // console.log('请求已超时，请重试!');
    }

    // xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(data);

    // 请求取消是触发；
    // xhr.onabort = function () {
    //     console.log('请求取消')
    // }
    // 如果请求被发出，则立即终止请求；
    // xhr.abort();

    xhr.onerror = function (e) {
        // console.log('error');
    }
}

const configs = {
    user: {
        method: 'GET',
        url: 'user',
        data: {
            username: 'uzi',
            password: 123456,
        },
        success: getUserInfo
    },
    finalTeam: {
        method: 'POST',
        url: 'final/team',
        data: {
            id: 123,
        },
        success: getFinalTeam
    },
    // {
    //     method: 'GET',
    // }
}

ajax(configs.user);

function getUserInfo(data) {
    console.log(data);
    const userNameEl = document.querySelector(".user-name");
    userNameEl.textContent = data.data.useInfo.userName
}


const handleClick = function (e) {
    ajax(configs.finalTeam);
}
const headerButEl = document.querySelector(".header-btn");
headerButEl.addEventListener('click', handleClick);
function getFinalTeam(data) {
    const list = data.data
    const len = list.length
    headerButEl.removeEventListener('click', handleClick);
    const teamEl = document.querySelector(".team");
    const documentFragment = document.createDocumentFragment()
    for (let i = 0; i < len; i++) {
        const liEl = document.createElement('li');
        liEl.textContent = `${i + 1}号种子: `;
        const spanEl = document.createElement('span');
        spanEl.className = 'team-item'
        spanEl.textContent = list[i].name
        liEl.appendChild(spanEl)
        documentFragment.appendChild(liEl);
    }
    teamEl.appendChild(documentFragment);
}

