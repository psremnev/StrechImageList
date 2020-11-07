	arr = ['./img/1.jpg', './img/2.jpg', './img/3.jpg',
	 './img/4.jpg', './img/5.jpg', './img/6.jpg',
	  './img/7.jpg', './img/8.jpg', './img/9.jpg',
	   './img/10.jpg', './img/11.jpg', './img/12.jpg',
		'./img/13.jpg', './img/14.jpg', './img/15.jpg',
		 './img/16.jpg', './img/17.jpg', './img/18.jpg',
		  './img/19.jpg', './img/20.jpg',]
	 
class ImageList extends HTMLElement {
	constructor(data) {
		super()
		this.className = 'strech-image-list'
		this.data_src = data
	}
	connectedCallback() {
		this.createList()
		this.offsetImage()
	}
	createList() {
		for (let i =0; i<this.data_src.length; i ++) {
			let item = document.createElement('img')
			item.className = 'strech-image-item'
			item.src = arr[i]
		
			//регулируем ширину плитки	
			item.onload = function(){
					let scaleHeight = (200/item.naturalHeight)*100
					item.style.maxWidth = ((item.naturalWidth * scaleHeight) / 100)*2 + 'px'
					if (item.naturalWidth > 1500) {
						item.style.flexGrow = 4
					}
					else if (item.naturalWidth > 800 && item.naturalWidth < 1300) {
						item.style.flexGrow = 3
					}
					else if (item.naturalWidth > 500 && item.naturalWidth < 800) {
						item.style.flexGrow = 2
					}
					else if (item.naturalWidth <= 500 || item.naturalWidth<item.naturalHeight) {
						item.style.flexGrow = 0
					}
					else item.style.flexGrow = 1
			}
			this.appendChild(item)
		}
	}
	offsetImage() {
		//смещение картинки от краев при увеличении по ховеру
		this.onmouseover = (e) => {
			let rootRect = this.getBoundingClientRect()
			let targetRect = e.target.getBoundingClientRect()
			
			if(targetRect.left < rootRect.left) {
				e.preventDefault()
				e.target.style.transform = 'scale(1.5) translateX(15%)'
				e.target.onmouseout = () => {
					e.target.style.transform = ''
				}
			}
			if(targetRect.right > rootRect.right) {
				e.target.style.transform = ' scale(1.5) translateX(-15%)'
				e.target.onmouseout = () => {
					e.target.style.transform = ''
				}
			}
			if(targetRect.top < rootRect.top) {
				e.target.style.transform = ' scale(1.5) translateY(15%)'
				e.target.onmouseout = () => {
					e.target.style.transform = ''
				}
			}
			if(targetRect.bottom > rootRect.bottom) {
				e.target.style.transform = ' scale(1.5) translateY(-15%)'
				e.target.onmouseout = () => {
					e.target.style.transform = ''
				}
			}
			//углы
			//верх
			if(targetRect.left < rootRect.left && targetRect.top < rootRect.top) {
				e.preventDefault()
				e.target.style.transform = 'scale(1.5) translateX(15%) translateY(15%)'
				e.target.onmouseout = () => {
					e.target.style.transform = ''
				}
			}
			if(targetRect.right > rootRect.right && targetRect.top < rootRect.top) {
				e.target.style.transform = ' scale(1.5) translateX(-15%) translateY(15%)'
				e.target.onmouseout = () => {
					e.target.style.transform = ''
				}
			}
			//низ
			if(targetRect.left < rootRect.left && targetRect.bottom > rootRect.bottom) {
				e.preventDefault()
				e.target.style.transform = 'scale(1.5) translateX(15%) translateY(-15%)'
				e.target.onmouseout = () => {
					e.target.style.transform = ''
				}
			}
			if(targetRect.right > rootRect.right && targetRect.bottom > rootRect.bottom) {
				e.preventDefault()
				e.target.style.transform = 'scale(1.5) translateX(-15%) translateY(-15%)'
				e.target.onmouseout = () => {
					e.target.style.transform = ''
				}
			}
		}
	}
}

customElements.define('image-list', ImageList)

document.addEventListener("DOMContentLoaded", ()=> {
	document.body.appendChild(new ImageList(arr))
});