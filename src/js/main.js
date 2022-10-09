	document.addEventListener('DOMContentLoaded', () => {
		const swiper = new Swiper('.reviews__slider', {  
			direction: 'horizontal',  
			pagination: {
			  el: '.swiper-pagination',
			  clickable: true,
			},  
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
			slidesPerView: 1
		 });
		 
		 const loadMoreBtn = document.querySelector('#load-more')
		 let currentItem = 3;
		 
		 loadMoreBtn.onclick = () => {
			let cards = [...document.querySelectorAll('.popular__items .popular__card')]
			for (var i = currentItem; i < currentItem + 3; i++){
			  cards[i].style.display = 'inline-block'
			}
			currentItem += 3;
		 
			if(currentItem >= cards.length) {
			  loadMoreBtn.style.display = 'none';
			}
		 }
		 
		 
		 const burger = document?.querySelector('[data-burger]');
		 const nav = document?.querySelector('.nav');
		 const navLinks = nav?.querySelectorAll('.header__link');
		 const body = document.body;
		 const header = document?.querySelector('.header');
		 const headerButtons = document?.querySelector('.header__buttons')
		 
		 burger?.addEventListener('click', () => {
			body.classList.toggle('stop-scroll');
			burger?.classList.toggle('burger_active');
			nav?.classList.toggle('header__nav_visible');
			headerButtons?.classList.toggle('header__buttons_visible');
		 });
		 
		 navLinks.forEach(el => {
			el.addEventListener('click', () => {
			 body.classList.remove('stop-scroll');
			 burger?.classList.remove('burger_active');
			 nav?.classList.remove('header__nav_visible');
			 headerButtons?.classList.toggle('header__buttons_visible');
			});
		 });
		 
		 
		 const closeModal = document.querySelector('.modal__btn-close')
		 const modal = document.querySelector('.modal')
		 const btns = document.querySelectorAll('.btn')
		 
		 closeModal.addEventListener('click', () => {
				 modal.classList.remove('modal_visible')
		 })
		 
		 btns.forEach((el) => {
			 el.addEventListener('click', () => {
				 modal.classList.add('modal_visible')
			 })
		 })
		 		 
		  // inputmask
		  const form = document.querySelectorAll('.form');
		  const telSelector = document.querySelector('.modal__input-tel') 
		  const inputMask = new Inputmask('+7 (999) 999-99-99');
		  inputMask.mask(telSelector);
		 
		 
		  const validation = new JustValidate('.form');
		 
		  validation
			 .addField('.modal__input-name', [
				{
				  rule: 'minLength',
				  value: 3,
				  errorMessage: 'Имя должно состоять минимум из 3 символов'
				},
				{
				  rule: 'maxLength',
				  value: 30,
				},
				{
				  rule: 'required',
				  value: true,
				  errorMessage: 'Введите имя!'
				}
			 ])
			 .addField('.modal__input-email', [
				{
				  rule: 'required',
				  value: true,
				  errorMessage: 'Email обязателен',
				},
				{
				  rule: 'email',
				  value: true,
				  errorMessage: 'Введите корректный Email',
				},
			 ])
			 .addField('.modal__input-tel', [
				{
				  rule: 'required',
				  value: true,
				  errorMessage: 'Телефон обязателен',
				},
				{
				  rule: 'function',
				  validator: function() {
					 const phone = telSelector.inputmask.unmaskedvalue();
					 return phone.length === 10;
				  },
				  errorMessage: 'Введите корректный телефон',
				},
			 ]).onSuccess((event) => {
				console.log('Validation passes and form submitted', event);
		 
				let formData = new FormData(event.target);
		 
				console.log(...formData);
		 
				let xhr = new XMLHttpRequest();
		 
				xhr.onreadystatechange = function () {
				  if (xhr.readyState === 4) {
					 if (xhr.status === 200) {
						console.log('Отправлено');
					 }
				  }
				}
		 
				xhr.open('POST', 'mail.php', true);
				xhr.send(formData);
		 
				event.target.reset();
			 });  
		 
   
		const scrollItems = document.querySelectorAll('.scroll-item');
	
		const scrollAnimation = () => {
			let windowBottom = (window.innerHeight) + window.scrollY;	
				
			scrollItems.forEach(el => {
				let scrollOffset = el.offsetTop + (el.offsetHeight);
				
				if (windowBottom >= scrollOffset) {					
					el.classList.add('animation-class');
				} else {					
					el.classList.remove('animation-class');
				}
			});
		};
	
		scrollAnimation();
		window.addEventListener('scroll', () => {			
			scrollAnimation();
		});
	});