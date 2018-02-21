'use strict';

(function (global) {
  var PHOTO_WIDTH = '40px';
  var PHOTO_HEIGHT = '40px';

  var mainMap = document.querySelector('.map');
  var popupCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapCard = popupCardTemplate.cloneNode(true);
  var fragmentPopupCard = document.createDocumentFragment();

  var renderPopupCard = function (advert) {

    while (mapCard.querySelector('.popup__pictures').lastChild) {
      mapCard.querySelector('.popup__pictures').removeChild(mapCard.querySelector('.popup__pictures').lastChild);
    }

    var specification = mapCard.querySelectorAll('p');
    mapCard.querySelector('img').src = advert.author.avatar;
    mapCard.querySelector('h3').textContent = advert.offer.title;
    specification[0].querySelector('small').textContent = advert.offer.address;
    specification[1].textContent = advert.offer.price + '\u20BD/ночь';
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
    specification[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
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

  global.setupPinHandler = function (pin, data) {
    pin.querySelector('img').addEventListener('click', function () {
      fragmentPopupCard.appendChild(renderPopupCard(data));
      mainMap.appendChild(fragmentPopupCard);
    });
  };
})(window);
