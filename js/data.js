'use strict';

(function (global) {
  var MAX_AREA_X = 900;
  var MIN_AREA_X = 300;
  var MAX_AREA_Y = 500;
  var MIN_AREA_Y = 150;
  var MAX_PRICE = 1000000;
  var MIN_PRICE = 1000;
  var AMOUNT_MAP_PINS = 8;

  var random = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  global.createAdverts = function () {
    var adverts = [];

    var getLocationX = function () {
      return random(MIN_AREA_X, MAX_AREA_X);
    };

    var getLocationY = function () {
      return random(MIN_AREA_Y, MAX_AREA_Y);
    };

    var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
    var titleOffer = [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ];

    var getTitleOffer = function () {
      return titleOffer[Math.floor(Math.random() * titleOffer.length)];
    };

    var priceOffer = function (currencyType) {
      return random(MIN_PRICE, MAX_PRICE) + currencyType;
    };

    var typeOffer = ['flat', 'house', 'bungalo'];
    var getTypeOffer = function () {
      var x = typeOffer[Math.floor(Math.random() * (typeOffer.length))];
      if (x === typeOffer[0]) {
        x = 'Квартира';
      } else if (x === typeOffer[1]) {
        x = 'Дом';
      } else {
        x = 'Бунгало';
      }
      return x;
    };

    var getRooms = function () {
      var maxRooms = 5;
      var minRooms = 1;

      return random(minRooms, maxRooms);
    };

    var getGuests = function () {
      var maxGuests = 20;
      var minGuests = 1;

      return random(maxGuests, minGuests);
    };

    var chekinOffer = ['12:00', '13:00', '14:00'];
    var getChekinTime = function () {
      return chekinOffer[Math.floor(Math.random() * (chekinOffer.length))];
    };

    var chekoutOffer = ['12:00', '13:00', '14:00'];
    var getChekoutTime = function () {
      return chekoutOffer[Math.floor(Math.random() * (chekoutOffer.length))];
    };

    var getAvatar = function () {
      avatarIndex = Math.random() * avatars.length;
      avatarIndex = Math.floor(avatarIndex);
      return avatarIndex;
    };

    for (var i = 0; i < AMOUNT_MAP_PINS; i++) {
      var avatarIndex = getAvatar();
      var locationX = getLocationX();
      var locationY = getLocationY();

      adverts.push({
        author: 'img/avatars/user0' + avatars[avatarIndex] + '.png',
        location: {
          x: locationX + 'px',
          y: locationY + 'px'
        },
        offer: {
          title: getTitleOffer(),
          address: locationX + ', ' + locationY,
          price: priceOffer('\u20BD/ночь'),
          type: getTypeOffer(),
          rooms: getRooms(),
          guests: getGuests(),
          chekin: getChekinTime(),
          chekout: getChekoutTime(),
          features: [
            '.feature--wifi',
            '.feature--dishwasher',
            '.feature--parking',
            '.feature--washer',
            '.feature--elevator',
            '.feature--conditioner'
          ],
          description: '',
          photos: [
            'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
          ]
        }
      });
      avatars.splice(avatarIndex, 1);
    }
    return adverts;
  };
})(window);
