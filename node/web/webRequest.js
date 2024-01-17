// import axios from './axios.js';
// import xmlHttp from './adapters/xhr.js'
const app = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
})

const configs = {
    upload: {
        url: 'file/upload',
        method: 'post',
        data: {},
    },
    images: {
        url: 'file/images/',
        method: 'get',
        data: {},
    }
}


function createUploadDOMItem(e) {
    const ul = document.querySelector('.upload-list');
    const fragment = document.createDocumentFragment()
    const _files = e.target.files;
    files = _files
    const len = _files.length;
    if (len === 0) {
        return false;
    }
    const images = [];
    for (let i = 0; i < len; i++) {
        const file = _files[0];
        const li = document.createElement('li');
        li.className = ('upload--picture-card el-upload-list__item');
        const img = document.createElement('img');
        img.classList.add('upload-list__item-thumbnail')
        img.src = URL.createObjectURL(file);
        li.appendChild(img);
        fragment.appendChild(li);
    }
    ul.prepend(fragment) // 插入第一个子节点前
}

const uploadBut = document.querySelector('.upload--picture-card');
uploadBut.addEventListener('click', handleUpload);
function handleUpload(e) {
    // e.preventDefault()
    const inputEl = document.querySelector('.upload__input');
    inputEl.click() // 模拟文件上传
    inputEl.addEventListener('change', handleInput);
}
let files;
function handleInput(e) {
    e.preventDefault()
    createUploadDOMItem(e)
}

const butEl1 = document.querySelector('.but1');

butEl1.addEventListener('click', (e) => {
    e.preventDefault()
    const formData = new FormData();
    let { url, data } = configs.upload
    const file = files[0];
    formData.append('files', file, file.name);
    data = formData
    app.post(url, data).then(res =>
        console.log(res)
    ).catch(err => {
        console.log(err)
    });
});

const butEl2 = document.querySelector('.but2');
butEl2.addEventListener('click', (e) => {
    const { url } = configs.images
    app.get(url + 1)
        .then(res => {
            consoel.log(res);
    })
})
