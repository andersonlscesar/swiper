'use strict'

class Swiper {
    
    /**
     * 
     * @param { string } swiper 
     * @param { NodeList | HTMLCollection } contents 
     */
    
    constructor(swiper, contents) {
        this.swiper             = swiper
        this.contents           = contents
        this.currentIndex       = 0
        this.startPosition      = 0
        this.isDragging         = false 
        this.currentTranslate   = 0
        this.prevTranslate      = 0
    }
    
    /**
     * This function active the swiper carousel
     * In order to reuse this class, after calling it, just call this func.
     * @return {void}
     */
    
    initSwiper() {
        let contents = this.contents 

        contents.forEach((content, index) => {
            content.querySelector('img').addEventListener('dragstart', (e) => e.preventDefault())
            content.addEventListener('mousedown', this.startDragging(index))
            content.addEventListener('mouseup', this.endDragging())
            content.addEventListener('mousemove', this.moveSwiper())
        })
    }

    /**
     * this function identifies when the user starts  dragging our swiper
     * @param { Number } index 
     * @return { Lambda Function }
     */


    startDragging(index) {
        return (e) => {
            this.currentIndex = index
            this.startPosition = this.getStartPosition(e)
            this.isDragging = true 
            this.moveSwiper()
        }
    }

    /**
     * It observes if the user stop touching/clicking on the screen
     * @return { void }
     */


    endDragging() {
        return () => {
            this.isDragging = false 
            this.moveSwiper()
        }
    }


    /**
     * it gets the start position when the user touch/click on the screen
     * @param { event } e 
     * @return { integer }
     */


    getStartPosition(e) {
        return e.clientX
    }

    /**
     * Move the swiper Element
     * @returns { void }
     */

    moveSwiper() {
        return (e) => {
            if(this.isDragging) {
                let currentPosition = this.getStartPosition(e)
                let dislocate = this.startPosition - currentPosition
                this.swiper.style.transform = `translateX(${-dislocate}px)`
                console.log(true)
                // this.currentTranslate = this.prevTranslate + currentPosition - this.startPosition
            }
        }      
    } 
}

let swiper = document.querySelector('.swipe')
let swiperContents = document.querySelectorAll('.swipe__content')

let swiperClass = new Swiper(swiper, swiperContents)
swiperClass.initSwiper()