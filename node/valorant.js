const totalCapacity = document.querySelector('.container')

const doms = document.createDocumentFragment()
for (let i = 0; i < 6; i++) {
    doms.appendChild(createDOM('div'))
}
totalCapacity.appendChild(doms)

function createDOM(name) {
    const newNode = document.createElement(name)
    newNode.classList.add('circle')
    const leftRandom = Math.random() * 500
    const topRandom = Math.random() * (100 - 0 + 1)
    newNode.style.position =  'absolute';
    newNode.style.top = topRandom + 'px'
    newNode.style.left = leftRandom + 'px'
    return newNode
}

totalCapacity.addEventListener('click', (e) => {
    const divEl = e.target
    if (e.target.tagName == 'DIV') {
        totalCapacity.removeChild(divEl)
        setTimeout(() => {
            totalCapacity.appendChild(doms.appendChild(createDOM('div')))
        }, 2000)
    }
})



