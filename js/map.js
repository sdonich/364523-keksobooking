'use strict';

(function () {
  var MAIN_PIN_RADIUS = 31;
  var NEEDLE = 22;
  var HORIZON = 150;

  var mainMap = document.querySelector('.map');
  var mainPin = mainMap.querySelector('.map__pin--main');
  var mainCoordinateX = mainPin.offsetLeft + MAIN_PIN_RADIUS;
  var mainCoordinateY = mainPin.offsetTop + MAIN_PIN_RADIUS;
  var mapFilter = mainMap.querySelector('.map__filters-container');
  var formNotice = document.querySelector('.notice__form');
  var fieldsets = formNotice.querySelectorAll('fieldset');
  var mainPinAdress = fieldsets[2].querySelector('input');
  mainPinAdress.value = mainCoordinateX + ', ' + mainCoordinateY;

  var rightMapBorder = mainMap.clientWidth - MAIN_PIN_RADIUS;
  var leftMapBorder = MAIN_PIN_RADIUS;
  var bottomMapBorder = mainMap.clientHeight - MAIN_PIN_RADIUS - NEEDLE - mapFilter.clientHeight;
  var topMapBorder = HORIZON - MAIN_PIN_RADIUS;

  var getFormCoords = function () {
    mainCoordinateX = mainPin.offsetLeft + MAIN_PIN_RADIUS;
    mainCoordinateY = mainPin.offsetTop + MAIN_PIN_RADIUS + NEEDLE;
    mainPinAdress.value = mainCoordinateX + ', ' + mainCoordinateY;
  };

  mainPin.querySelector('img').addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    mainMap.classList.remove('map--faded');
    formNotice.classList.remove('notice__form--disabled');
    window.setFormState(false);

    var startCoords = {
      x: evt.target.parentElement.clientX,
      y: evt.target.parentElement.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y < bottomMapBorder && mainPin.offsetTop - shift.y > topMapBorder) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      if (mainPin.offsetLeft - shift.x > leftMapBorder && mainPin.offsetLeft - shift.x < rightMapBorder) {
        mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
      }
      getFormCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.createMapPins();

      getFormCoords();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

