'use strict';

(function (global) {

  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');
  var filterGuests = document.querySelector('#housing-guests');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterPrice = document.querySelector('#housing-price');
  var filterType = document.querySelector('#housing-type');

  global.useFilter = function (adverts) {
    // var data = adverts;

    if (adverts.length !== 0 && filterWifi.checked) {
      adverts = adverts.filter(function (advert) {
        return advert.offer.features.indexOf('wifi') !== -1;
      });
    }
    if (adverts.length !== 0 && filterDishwasher.checked) {
      adverts = adverts.filter(function (advert) {
        return advert.offer.features.indexOf('dishwasher') !== -1;
      });
    }
    if (adverts.length !== 0 && filterParking.checked) {
      adverts = adverts.filter(function (advert) {
        return advert.offer.features.indexOf('parking') !== -1;
      });
    }
    if (adverts.length !== 0 && filterWasher.checked) {
      adverts = adverts.filter(function (advert) {
        return advert.offer.features.indexOf('washer') !== -1;
      });
    }
    if (adverts.length !== 0 && filterElevator.checked) {
      adverts = adverts.filter(function (advert) {
        return advert.offer.features.indexOf('elevator') !== -1;
      });
    }
    if (adverts.length !== 0 && filterConditioner.checked) {
      adverts = adverts.filter(function (advert) {
        return advert.offer.features.indexOf('conditioner') !== -1;
      });
    }
    if (adverts.length !== 0 && filterGuests.value === '1') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.guests === 1;
      });
    }
    if (adverts.length !== 0 && filterGuests.value === '2') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.guests === 2;
      });
    }
    if (adverts.length !== 0 && filterRooms.value === '1') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.rooms === 1;
      });
    }
    if (adverts.length !== 0 && filterRooms.value === '2') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.rooms === 2;
      });
    }
    if (adverts.length !== 0 && filterRooms.value === '3') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.rooms === 3;
      });
    }
    if (adverts.length !== 0 && filterPrice.value === 'middle') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.price >= 10000 && advert.offer.price <= 50000;
      });
    }
    if (adverts.length !== 0 && filterPrice.value === 'low') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.price <= 10000;
      });
    }
    if (adverts.length !== 0 && filterPrice.value === 'high') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.price >= 50000;
      });
    }
    if (adverts.length !== 0 && filterType.value === 'flat') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.type === 'flat';
      });
    }
    if (adverts.length !== 0 && filterType.value === 'house') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.type === 'house';
      });
    }
    if (adverts.length !== 0 && filterType.value === 'bungalo') {
      adverts = adverts.filter(function (advert) {
        return advert.offer.type === 'bungalo';
      });
    }

    return adverts;
  };
})(window);


