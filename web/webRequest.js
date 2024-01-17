import axios from './axios.js';

axios.create({
    baseURL: 'localhost:9003/',
})

const configs = {
    upload: {
        url: 'file/upload',
        method: 'post',
        data: {}
    },

}

const uploadBut = document.querySelector('.upload--picture-card');
uploadBut.addEventListener('click', handleUpload);
function handleUpload(e) {
    const inputEl = document.querySelector('.upload__input');
    inputEl.click() // 模拟文件上传
    inputEl.addEventListener('change', handleInput);
}
let files;
function handleInput(e) {
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

const butEl = document.querySelector('.but');

butEl.addEventListener('click', (e) => {
    const formData = new FormData();
    formData.set('files', files);
    const config = configs['upload'];
    axios.post(config.url, {}).catch(err => console.log(err));
});