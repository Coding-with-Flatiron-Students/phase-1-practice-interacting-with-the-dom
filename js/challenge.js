//Nodes to utilize:
const counterElement = document.getElementById("counter")
const likesList = document.getElementById("likesList")
const minusBtn = document.getElementById("minus")
const plusBtn = document.getElementById("plus")
const heartBtn = document.getElementById("heart")
const pauseBtn = document.getElementById("pause")
const commentForm = document.getElementById("comment-form")
const commentList = document.getElementById("list")

const likeFreq = {}
let isPlaying = true
let interval

const currentCounter = () => {
    return parseInt(counterElement.innerText)
}

const intervalSet = () => {
    interval = setInterval(() => counterElement.innerText = currentCounter() + 1, 1000)
}

const intervalStatus = () => {
    pauseBtn.innerText = 
            isPlaying 
                ? ((intervalSet()) , ("pause"))
                : ((clearInterval(interval)), ("resume")) 
}

const likeNumber = () => {
    const currentNumber = parseInt(counterElement.innerText)
    
    likeFreq[currentNumber] = (likeFreq[currentNumber] || 0) + 1
    likesList.innerText = ""

    for(let key in likeFreq){     
        const likeStatement = document.createElement("li")
        likeStatement.innerText = `${key} has been liked ${likeFreq[key]} times.`
        likesList.append(likeStatement)
    }
}

const buttonFunctionality = () => {
    const buttons = document.getElementsByTagName("button")
    for(let key in buttons){
        let button = buttons.item(parseInt(key))
            if(button.id !== "pause"){
                button.disabled = !isPlaying
            }
        }
}

pauseBtn.addEventListener("click", () => {
    isPlaying = !isPlaying
    intervalStatus()
    buttonFunctionality()
})

minusBtn.addEventListener("click", () => {
    counterElement.innerText = currentCounter() - 1
})

plusBtn.addEventListener("click", () => {
    counterElement.innerText = currentCounter() + 1
})

commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newComment = e.target[`comment-input`].value
    const commentPTag = document.createElement("p")
    commentPTag.innerText = newComment
    commentList.append(commentPTag)
})

heartBtn.addEventListener("click", likeNumber)

document.addEventListener("DOMContentLoaded", () => {
    intervalStatus()
})