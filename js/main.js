"use strict";
"use strict";
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener('DOMContentLoaded', function () {
  var _document, _document2, _document3;

  var swiper = new Swiper('.reviews__slider', {
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1
  });
  var favBtns = document.querySelectorAll('.card__btn-fav');
  favBtns.forEach(function (el) {
    el.addEventListener('click', function () {
      el.classList.toggle('card__btn-fav_active');
    });
  });
  var loadMoreBtn = document.querySelector('#load-more');
  var currentItem = 3;

  loadMoreBtn.onclick = function () {
    var cards = _toConsumableArray(document.querySelectorAll('.popular__items .popular__card'));

    for (var i = currentItem; i < currentItem + 3; i++) {
      cards[i].classList.add('popular__card_visible');
    }

    currentItem += 3;

    if (currentItem >= cards.length) {
      loadMoreBtn.style.display = 'none';
    }
  };

  var burger = (_document = document) === null || _document === void 0 ? void 0 : _document.querySelector('[data-burger]');
  var nav = (_document2 = document) === null || _document2 === void 0 ? void 0 : _document2.querySelector('.nav');
  var navLinks = nav === null || nav === void 0 ? void 0 : nav.querySelectorAll('.header__link');
  var body = document.body;
  var headerButtons = (_document3 = document) === null || _document3 === void 0 ? void 0 : _document3.querySelector('.header__buttons');
  burger === null || burger === void 0 ? void 0 : burger.addEventListener('click', function () {
    document.documentElement.classList.toggle('stop-scroll');
    body.classList.toggle('stop-scroll');
    burger === null || burger === void 0 ? void 0 : burger.classList.toggle('burger_active');
    nav === null || nav === void 0 ? void 0 : nav.classList.toggle('header__nav_visible');
    headerButtons === null || headerButtons === void 0 ? void 0 : headerButtons.classList.toggle('header__buttons_visible');
  });
  navLinks.forEach(function (el) {
    el.addEventListener('click', function () {
      document.documentElement.classList.remove('stop-scroll');
      body.classList.remove('stop-scroll');
      burger === null || burger === void 0 ? void 0 : burger.classList.remove('burger_active');
      nav === null || nav === void 0 ? void 0 : nav.classList.remove('header__nav_visible');
      headerButtons === null || headerButtons === void 0 ? void 0 : headerButtons.classList.toggle('header__buttons_visible');
    });
  });
  var closeModal = document.querySelector('.modal__btn-close');
  var modal = document.querySelector('.modal');
  var btns = document.querySelectorAll('.btn');
  closeModal.addEventListener('click', function () {
    if (burger !== null && burger !== void 0 && burger.classList.contains('burger_active')) {
      modal.classList.remove('modal_visible');
    } else {
      modal.classList.remove('modal_visible');
      body.classList.remove('stop-scroll');
      document.documentElement.classList.remove('stop-scroll');
    }
  });
  btns.forEach(function (el) {
    el.addEventListener('click', function () {
      modal.classList.add('modal_visible');
      body.classList.add('stop-scroll');
      document.documentElement.classList.add('stop-scroll');
    });
  }); // inputmask	

  var telSelector = document.querySelector('.modal__input-tel');
  var inputMask = new Inputmask('+7 (999) 999-99-99');
  inputMask.mask(telSelector);
  var validation = new JustValidate('.form');
  validation.addField('.modal__input-name', [{
    rule: 'minLength',
    value: 3,
    errorMessage: 'Name must contain minimum 3 characters*'
  }, {
    rule: 'maxLength',
    value: 30
  }, {
    rule: 'required',
    value: true,
    errorMessage: 'Enter your name!*'
  }]).addField('.modal__input-email', [{
    rule: 'required',
    value: true,
    errorMessage: 'Email ios required*'
  }, {
    rule: 'email',
    value: true,
    errorMessage: 'Enter valid Email*'
  }]).addField('.modal__input-tel', [{
    rule: 'required',
    value: true,
    errorMessage: 'Phone number is required*'
  }, {
    rule: 'function',
    validator: function validator() {
      var phone = telSelector.inputmask.unmaskedvalue();
      return phone.length === 10;
    },
    errorMessage: 'Enter valid phone number*'
  }]).onSuccess(function (event) {
    var _console;

    console.log('Validation passes and form submitted', event);
    var formData = new FormData(event.target);

    (_console = console).log.apply(_console, _toConsumableArray(formData));

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Submit');
        }
      }
    };

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
    event.target.reset();
  });
  var scrollItems = document.querySelectorAll('.scroll-item');

  var scrollAnimation = function scrollAnimation() {
    var windowBottom = window.innerHeight + window.scrollY;
    scrollItems.forEach(function (el) {
      var scrollOffset = el.offsetTop + el.offsetHeight;

      if (windowBottom >= scrollOffset) {
        el.classList.add('animation-class');
      } else {
        el.classList.remove('animation-class');
      }
    });
  };

  scrollAnimation();
  window.addEventListener('scroll', function () {
    scrollAnimation();
  });
});
//# sourceMappingURL=main.js.map
