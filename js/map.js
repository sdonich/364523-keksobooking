'use strict';

(function () {
  var MAIN_PIN_RADIUS = 31;

  var mainMap = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mainMap.querySelector('.map__pin--main').querySelector('img');
  var mainCoordinateX = Math.round(mainPin.getBoundingClientRect().left + window.scrollX) + MAIN_PIN_RADIUS;
  var mainCoordinateY = Math.round(mainPin.getBoundingClientRect().top + window.scrollY) + MAIN_PIN_RADIUS;
  var formNotice = document.querySelector('.notice__form');
  var fieldsets = formNotice.querySelectorAll('fieldset');
  var mainPinAdress = fieldsets[2].querySelector('input');
  mainPinAdress.value = mainCoordinateX + ', ' + mainCoordinateY;

  mainPin.addEventListener('mouseup', function () {
    mainMap.classList.remove('map--faded');
    formNotice.classList.remove('notice__form--disabled');

    var pinsFragment = window.createMapPins();
    mapPins.appendChild(pinsFragment);
    window.enableForm();
  });
})();

