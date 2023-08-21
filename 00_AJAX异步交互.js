import { formatQuery } from './day09_前端后端交互/utils/client.js';

const ajax = function (config) {
    const xhr = new XMLHttpRequest()
    const host = 'http://127.0.0.1:3000/'
    let url = host + config.url
    const method = config.method?.toLocaleUpperCase() || 'GET'
    
    let data = null
    if (method === 'POST') {
        const params = config.data;
        if (params) {
            data = typeof params === 'string' ? params : JSON.stringify(params);
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

    xhr.setRequestHeader('Content-Type', 'application/json');

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
        success: getUserInfo,
    },
    finalTeam: {
        method: 'POST',
        url: 'final/team',
        data: {
            id: 123,
        },
        success: getFinalTeam,
    },
    imageFlie: {
        method: 'POST',
        url: 'image/file',
    },
}

ajax(configs.user);

function getUserInfo(data) {
    const userNameEl = document.querySelector(".user-name");
    userNameEl.textContent = data.data.userInfo
    .userName
}


const handleClick = function (e) {
    ajax(configs.finalTeam);
    ajax(configs.engine);
}
const headerButEl = document.querySelector(".header-btn");
headerButEl.addEventListener('click', handleClick);
function getFinalTeam(data) {
    const list = data.data;
    const len = list.length;
    headerButEl.removeEventListener('click', handleClick);
    const teamEl = document.querySelector(".team");
    const documentFragment = document.createDocumentFragment();
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


const uploadBut = document.querySelector('.upload--picture-card');
uploadBut.addEventListener('click', handleUpload);
function handleUpload(e) {
    const inputEl = document.querySelector('.upload__input');
    inputEl.click() // 模拟文件上传
    inputEl.addEventListener('change', handleInput);
}

function handleInput(e) {
    const ul = document.querySelector('.upload-list');
    const fragment = document.createDocumentFragment()
    const files = e.target.files;
    const len = files.length;
    if (len === 0) {
        return false;
    }
    const images = [];
    for (let i = 0; i < len; i++) {
        const file = files[0];
        // images.push(
        //     {
        //         url: URL.createObjectURL(file),
        //         name: file.name,
        //     }
        // ) 
        const li = document.createElement('li');
        li.className = ('upload--picture-card el-upload-list__item');
        const img = document.createElement('img');
        img.classList.add('upload-list__item-thumbnail')
        img.src = URL.createObjectURL(file);
        li.appendChild(img);
        fragment.appendChild(li);
        // imgLoad.push(new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.onload = function (e) {
        //         const blob = new Blob([e.target.result], { type: file.type });
        //         const 
        //         resolve()
        //         console.log(blob, 'blob', file.type)
        //     };
        //     reader.readAsArrayBuffer(file);
        // }))
    }
    ul.prepend(fragment) // 插入第一个子节点前
}

