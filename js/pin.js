'use strict';

(function (global) {
  var adverts = window.createAdverts();
  var fragmentMapPin = document.createDocumentFragment();
  var similaradvertsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderMapPin = function (pin) {
    var mapPin = similaradvertsTemplate.cloneNode(true);

    mapPin.style.left = pin.location.x;
    mapPin.style.top = pin.location.y;
    mapPin.querySelector('img').src = pin.author;
    return mapPin;
  };

  global.createMapPins = function () {
    for (var i = 0; i < adverts.length; i++) {
      var pin = renderMapPin(adverts[i]);

      window.setupPinHandler(pin, adverts[i]);
      fragmentMapPin.appendChild(pin);
    }

    return fragmentMapPin;
  };
})(window);
