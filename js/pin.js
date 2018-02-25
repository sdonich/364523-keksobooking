'use strict';

(function (global) {
  var MAX_MAP_PINS = 5;
  var mapPins = document.querySelector('.map__pins');
  var loadAdverts = [];
  var fragmentMapPin = document.createDocumentFragment();
  var similaradvertsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var cleanMapPins = function () {
    while (mapPins.children[2]) {
      mapPins.removeChild(mapPins.children[2]);
    }
  };

  var formContainer = document.querySelector('.map__filters');
  formContainer.addEventListener('change', function () {
    cleanMapPins();
    removePopup();
    window.debounce(global.createMapPins);
  });

  var removePopup = function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
  };

  var renderMapPin = function (pin) {
    var mapPin = similaradvertsTemplate.cloneNode(true);

    mapPin.style.left = pin.location.x + 'px';
    mapPin.style.top = pin.location.y + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    return mapPin;
  };

  var chooseMapPin = function () {
    var adverts = window.useFilter(loadAdverts);

    for (var i = 0; i < MAX_MAP_PINS && i < adverts.length; i++) {
      var pin = renderMapPin(adverts[i]);
      window.setupPinHandler(pin, adverts[i]);
      fragmentMapPin.appendChild(pin);
    }
    return fragmentMapPin;
  };

  global.createMapPins = function () {
    window.backend.load(function (response) {
      loadAdverts = response.slice();
      mapPins.appendChild(chooseMapPin());
    },
    window.notice.error);
  };
})(window);
