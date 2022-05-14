const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#00FFFF', '#0000FF', '#800080', '	#FFA07A', '#66CDAA', '#B0E0E6', '#A0522D', '#DEB887'] 
let time = 0
let score = 0



startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        ctreateRandomCircle()
        setColor()
    }
}) 

function startGame() {
    setInterval(decreaseTime, 1000)
    ctreateRandomCircle()
    setTime(time)  
} 

function decreaseTime() {
    if (time === 0) {
        finishGame()
    }else {
        let current = --time
        if (current < 10) {
        current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет:<span clas ="primary">${score}</span></h1>`

}


function ctreateRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomeNamber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomeNamber(0, width - size)
    const y = getRandomeNamber(0, height - size)
    const color = getRandomColor()
    
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

    board.append(circle)
}

function getRandomeNamber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}