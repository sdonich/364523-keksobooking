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

var mainMap = document.querySelector('.map');
mainMap.classList.remove('map--faded');
var mapPins = document.querySelector('.map__pins');
var similaradvertsTemplate = document.querySelector('template').content.querySelector('.map__pin');
var popupCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapCard = popupCardTemplate.cloneNode(true);

// данные для массива c похожими объявлениями
var getLocationX = function () {
  return Math.round(MIN_AREA_X + Math.random() * (MAX_AREA_X - MIN_AREA_X));
};

var getLocationY = function () {
  return Math.round(MIN_AREA_Y + Math.random() * (MAX_AREA_Y - MIN_AREA_Y));
};


var avatars = [1, 2, 3, 4, 5, 6, 7, 8];

var getAvatar = function () {
  avatarIndex = Math.random() * avatars.length;
  avatarIndex = Math.floor(avatarIndex);
  return avatarIndex;
};

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
  return Math.round(MIN_PRICE + Math.random() * (MAX_PRICE - MIN_PRICE)) + currencyType;
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
  return Math.round(minRooms + Math.random() * (maxRooms - minRooms));
};

var getGuests = function () {
  var maxGuests = 20;
  var minRooms = 1;
  return Math.round(minRooms + Math.random() * (maxGuests - minRooms));
};

var chekinOffer = ['12:00', '13:00', '14:00'];
var getChekinTime = function () {
  return chekinOffer[Math.floor(Math.random() * (chekinOffer.length))];
};

var chekoutOffer = ['12:00', '13:00', '14:00'];
var getChekoutTime = function () {
  return chekoutOffer[Math.floor(Math.random() * (chekoutOffer.length))];
};

// получение рандомной вставки дополнительных удобств
var randomFeatures = function () {
  var x = Math.random();
  if (x > 0.5) {
    return 'none';
  }
  return '';
};


// объект с похожими объявлениями
var adverts = [];

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

// отрисовка указателей похожих объявлений
var renderMapPin = function (MapPin) {
  var mapPin = similaradvertsTemplate.cloneNode(true);

  mapPin.style.left = MapPin.location.x;
  mapPin.style.top = MapPin.location.y;
  mapPin.querySelector('img').src = MapPin.author;
  return mapPin;
};

var fragmentMapPin = document.createDocumentFragment();
for (i = 0; i < AMOUNT_MAP_PINS; i++) {
  fragmentMapPin.appendChild(renderMapPin(adverts[i]));
}

// отрисовка фотографий квартиры
var addMapCardPhoto = function (photo) {
  var mapCardPhoto = mapCard.querySelector('.popup__pictures').querySelector('img').cloneNode(true);

  mapCardPhoto.src = photo;
  mapCardPhoto.style.width = PHOTO_WIDTH;
  mapCardPhoto.style.height = PHOTO_HEIGHT;
  return mapCardPhoto;
};

// отрисовка popup'а выбранного объявления
var fragmentPopupCard = document.createDocumentFragment();
var renderPopupCard = function (advert) {
  fragmentPopupCard.appendChild(mapCard);
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

  for (i = 0; i < advert.offer.features.length; i++) {
    mapCard.querySelector(advert.offer.features[i]).style.display = randomFeatures();
  }

  mapCard.querySelector('ul').nextElementSibling.textContent = advert.offer.description;

  for (i = 0; i < advert.offer.photos.length; i++) {
    mapCard.appendChild(addMapCardPhoto(advert.offer.photos[i]));
  }

  return fragmentPopupCard;
};

// отрисовка карты со всеми объектами
renderPopupCard(adverts[0]);
mapPins.appendChild(fragmentMapPin);
mainMap.appendChild(fragmentPopupCard);
