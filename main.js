const swipe = document.querySelector('.swipe')
const swipeContents = document.querySelectorAll('.swipe__content')

const state = {
    isDragging: false,
    startPosition: 0,
    currentIndex: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    animationId: ''
}

swipeContents.forEach((content, index) => {
    content.addEventListener('dragstart', (e) => e.preventDefault())

    content.addEventListener('mousedown', startAction(index))
    content.addEventListener('mouseup', endAction)
    content.addEventListener('mousemove', moveAction)
    content.addEventListener('mouseleave', endAction)

    content.addEventListener('touchstart', startAction(index))
    content.addEventListener('touchend', endAction)
    content.addEventListener('touchmove', moveAction)
})

function startAction(index){
    return (e) => {
        e.preventDefault()
        state.isDragging = true
        state.currentIndex = index
        // swipe.classList.add('grabbing')
        state.animationId = requestAnimationFrame(animation)
        state.startPosition = getStartPosition(e)
    }
}

function endAction(e){
    e.preventDefault()
    state.isDragging = false 
    // swipe.classList.remove('grabbing')
    let moved = state.currentTranslate - state.prevTranslate
    if(moved < - 50 && state.currentIndex < swipeContents.length - 1) state.currentIndex++
    if(moved > 50 && state.currentIndex > 0) state.currentIndex--
    getPositionByIndex()
}

function getStartPosition(e){
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
}



function animation(){
    move()
    if(state.isDragging){
        requestAnimationFrame(animation)
    }
}

function getPositionByIndex(){
    state.currentTranslate = state.currentIndex * - window.innerWidth
    state.prevTranslate = state.currentTranslate
    move()
}

function move(){
    swipe.style.transform = `translateX(${state.currentTranslate}px)`
}

function moveAction(e){
    e.preventDefault()
    if(state.isDragging){
        let currentPosition = getStartPosition(e)
        state.currentTranslate = state.prevTranslate + currentPosition - state.startPosition
    }
}