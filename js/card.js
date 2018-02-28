'use strict';

(function (global) {
  var PHOTO_WIDTH = '40px';
  var PHOTO_HEIGHT = '40px';

  var mainMap = document.querySelector('.map');
  var popupCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapCard = popupCardTemplate.cloneNode(true);
  var fragmentPopupCard = document.createDocumentFragment();
  var crossCloseButton = mapCard.querySelector('.popup__close');

  var renderPopupCard = function (advert) {
    while (mapCard.querySelector('.popup__pictures').lastChild) {
      mapCard.querySelector('.popup__pictures').removeChild(mapCard.querySelector('.popup__pictures').lastChild);
    }
    while (mapCard.querySelector('.popup__features').lastChild) {
      mapCard.querySelector('.popup__features').removeChild(mapCard.querySelector('.popup__features').lastChild);
    }

    var specification = mapCard.querySelectorAll('p');
    mapCard.querySelector('img').src = advert.author.avatar;
    mapCard.querySelector('h3').textContent = advert.offer.title;
    specification[0].querySelector('small').textContent = advert.offer.address;
    specification[1].textContent = advert.offer.price + '\u20BD/ночь';

    switch (advert.offer.type) {
      case 'flat':
        mapCard.querySelector('h4').textContent = 'Квартира';
        break;
      case 'house':
        mapCard.querySelector('h4').textContent = 'Дом';
        break;
      case 'bungalo':
        mapCard.querySelector('h4').textContent = 'Лачуга';
        break;
      case 'palace':
        mapCard.querySelector('h4').textContent = 'Дворец';
        break;
    }

    var amountRooms = ' комнаты';
    if (advert.offer.rooms === 1) {
      amountRooms = ' комната';
    }
    var amountGuests = ' гостей';
    if (advert.offer.guests === 1) {
      amountGuests = ' гостя';
    }
    specification[2].textContent = advert.offer.rooms + amountRooms + ' для ' + advert.offer.guests + amountGuests;
    specification[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    renderFeatures(advert);
    specification[4].textContent = advert.offer.description;
    mapCard.appendChild(renderMapCardPhoto(advert));

    return mapCard;
  };

  var renderFeatures = function (advert) {
    var featuresCard = popupCardTemplate.querySelector('.popup__features').cloneNode(true);
    var features = featuresCard.querySelectorAll('li');
    for (var i = 0; i < advert.offer.features.length; i++) {
      switch (advert.offer.features[i]) {
        case 'wifi':
          mapCard.querySelector('.popup__features').appendChild(features[0]);
          break;
        case 'dishwasher':
          mapCard.querySelector('.popup__features').appendChild(features[1]);
          break;
        case 'parking':
          mapCard.querySelector('.popup__features').appendChild(features[2]);
          break;
        case 'washer':
          mapCard.querySelector('.popup__features').appendChild(features[3]);
          break;
        case 'elevator':
          mapCard.querySelector('.popup__features').appendChild(features[4]);
          break;
        case 'conditioner':
          mapCard.querySelector('.popup__features').appendChild(features[5]);
          break;
      }
    }
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

  var closePopup = function () {
    document.querySelector('.popup').remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };
  var onPopupEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var renderPopup = function (data) {
    fragmentPopupCard.appendChild(renderPopupCard(data));
    mainMap.appendChild(fragmentPopupCard);

    crossCloseButton.addEventListener('click', closePopup);
    crossCloseButton.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscPress);
  };

  global.setupPinHandler = function (pin, data) {
    pin.querySelector('img').addEventListener('click', function () {
      renderPopup(data);
    });

    pin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        renderPopup(data);
      });
    });
  };
})(window);
