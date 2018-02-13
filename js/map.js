'use strict';

var MAX_AREA_X = 900;
var MIN_AREA_X = 300;
var MAX_AREA_Y = 500;
var MIN_AREA_Y = 150;
var MAX_PRICE = 1000000;
var MIN_PRICE = 1000;
var AMOUNT_MAP_PINS = 8;
var PHOTO_WIDTH = '70px';
var PHOTO_HEIGHT = '70px';
var MAIN_PIN_RADIUS = 31;

var mainMap = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var similaradvertsTemplate = document.querySelector('template').content.querySelector('.map__pin');
var popupCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapCard = popupCardTemplate.cloneNode(true);
var mainPin = mainMap.querySelector('.map__pin--main').querySelector('img');
var mainCoordinateX = Math.round(mainPin.getBoundingClientRect().left + window.scrollX) + MAIN_PIN_RADIUS;
var mainCoordinateY = Math.round(mainPin.getBoundingClientRect().top + window.scrollY) + MAIN_PIN_RADIUS;
var formNotice = document.querySelector('.notice__form');
var fieldsets = formNotice.querySelectorAll('fieldset');
var mainPinAdress = fieldsets[2].querySelector('input');
mainPinAdress.value = mainCoordinateX + ', ' + mainCoordinateY;
var fragmentMapPin = document.createDocumentFragment();
var fragmentPopupCard = document.createDocumentFragment();


// функция для рандома
var random = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var createAdverts = function () {

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

  for (var j = 0; j < AMOUNT_MAP_PINS; j++) {
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

// отрисовка меток похожих объявлений
var renderMapPin = function (pin) {
  var mapPin = similaradvertsTemplate.cloneNode(true);

  mapPin.style.left = pin.location.x;
  mapPin.style.top = pin.location.y;
  mapPin.querySelector('img').src = pin.author;
  return mapPin;
};

var setupPinHandler = function (pin, data) {
  pin.querySelector('img').addEventListener('click', function () {
    fragmentPopupCard.appendChild(renderPopupCard(data));
    mainMap.appendChild(fragmentPopupCard);
  });
};

var createMapPins = function (adverts) {

  for (var i = 0; i < AMOUNT_MAP_PINS; i++) {
    var pin = renderMapPin(adverts[i]);

    setupPinHandler(pin, adverts[i]);
    fragmentMapPin.appendChild(pin);
  }
  return fragmentMapPin;
};

// функция для отрисовки попапа выбранного похожего объявления
var renderPopupCard = function (advert) {

  while (mapCard.querySelector('.popup__pictures').lastChild) {
    mapCard.querySelector('.popup__pictures').removeChild(mapCard.querySelector('.popup__pictures').lastChild);
  }

  var specification = mapCard.querySelectorAll('p');
  mapCard.querySelector('img').src = advert.author;
  mapCard.querySelector('h3').textContent = advert.offer.title;
  specification[0].querySelector('small').textContent = advert.offer.address;
  specification[1].textContent = advert.offer.price;
  mapCard.querySelector('h4').textContent = advert.offer.type;
  var amountRooms = ' комнаты';
  if (advert.offer.rooms === 1) {
    amountRooms = ' комната';
  }
  var amountGuests = ' гостей';
  if (advert.offer.guests === 1) {
    amountGuests = ' гостя';
  }
  specification[2].textContent = advert.offer.rooms + amountRooms + ' для ' + advert.offer.guests + amountGuests;
  specification[3].textContent = 'Заезд после ' + advert.offer.chekin + ', выезд до ' + advert.offer.chekout;
  specification[4].textContent = advert.offer.description;
  mapCard.appendChild(renderMapCardPhoto(advert));

  return mapCard;
};

var renderMapCardPhoto = function (advert) {
  var mapCardPhoto = mapCard.querySelector('.popup__pictures');

  var addMapCardPhoto = function (photo) {
    var cardPhoto = popupCardTemplate.querySelector('.popup__pictures').querySelector('li').cloneNode(true);
    cardPhoto.querySelector('img').style.width = PHOTO_WIDTH;
    cardPhoto.querySelector('img').style.height = PHOTO_HEIGHT;
    cardPhoto.querySelector('img').src = photo;
    return cardPhoto;
  };
  for (var j = 0; j < advert.offer.photos.length; j++) {
    mapCardPhoto.appendChild(addMapCardPhoto(advert.offer.photos[j]));
  }
  return mapCardPhoto;
};

// функция для события "Клик по главной метке"
mainPin.addEventListener('mouseup', function () {

  mainMap.classList.remove('map--faded');
  formNotice.classList.remove('notice__form--disabled');
  var adverts = createAdverts();

  var pinsFragment = createMapPins(adverts);
  mapPins.appendChild(pinsFragment);

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
});

