'use strict';

(function (global) {
  var mapPins = document.querySelector('.map__pins');
  var adverts = [];
  var fragmentMapPin = document.createDocumentFragment();
  var similaradvertsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderMapPin = function (pin) {
    var mapPin = similaradvertsTemplate.cloneNode(true);

    mapPin.style.left = pin.location.x + 'px';
    mapPin.style.top = pin.location.y + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    return mapPin;
  };

  global.createMapPins = function () {
    window.backend.load(function (response) {
      adverts = response.slice();

      for (var i = 0; i < adverts.length; i++) {
        var pin = renderMapPin(adverts[i]);

        window.setupPinHandler(pin, adverts[i]);
        fragmentMapPin.appendChild(pin);
      }
      mapPins.appendChild(fragmentMapPin);
    },
    window.notice.error);
  };
})(window);
