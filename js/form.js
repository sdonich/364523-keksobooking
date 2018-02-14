'use strict';

(function (global) {
  (function () {
    var formNotice = document.querySelector('.notice__form');
    var fieldsets = formNotice.querySelectorAll('fieldset');
    (function () {
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = true;
      }
    })();
  })();

  var formNotice = document.querySelector('.notice__form');
  var fieldsets = formNotice.querySelectorAll('fieldset');

  global.enableForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  document.querySelector('#timein').addEventListener('change', function (evt) {
    var changeTimeCheckin = document.querySelector('#timeout');
    changeTimeCheckin.value = evt.target.value;
  });

  document.querySelector('#timeout').addEventListener('change', function (evt) {
    var changeTimeCheckin = document.querySelector('#timein');
    changeTimeCheckin.value = evt.target.value;
  });

  document.querySelector('#type').addEventListener('change', function (evt) {
    var changeType = document.querySelector('#type');
    var minPrice = document.querySelector('#price');

    if (evt.target.value === 'flat') {
      changeType.min = '0';
      minPrice.placeholder = '5000';
    }
    if (evt.target.value === 'bungalo') {
      changeType.min = '1000';
      changeType.placeholder = '1000';
      minPrice.placeholder = '5000';
    }
    if (evt.target.value === 'house') {
      changeType.min = '5000';
      minPrice.placeholder = '5000';
    }
    if (evt.target.value === 'palace') {
      changeType.min = '10000';
      minPrice.placeholder = '10000';
    }
  });
  document.querySelector('#room_number').addEventListener('change', function (evt) {
    var numGuests = document.querySelector('#capacity');
    var option = numGuests.querySelectorAll('option');

    if (evt.target.value === '1') {
      option[0].disabled = true;
      option[1].disabled = true;
      option[2].disabled = false;
      option[3].disabled = true;
      numGuests.value = '1';
    }
    if (evt.target.value === '2') {
      option[0].disabled = false;
      option[1].disabled = false;
      option[2].disabled = false;
      option[3].disabled = true;
      numGuests.value = '2';
    }
    if (evt.target.value === '3') {
      option[0].disabled = false;
      option[1].disabled = false;
      option[2].disabled = false;
      option[3].disabled = true;
      numGuests.value = '3';
    }
    if (evt.target.value === '100') {
      option[0].disabled = true;
      option[1].disabled = true;
      option[2].disabled = true;
      option[3].disabled = false;
      numGuests.value = '0';
    }
  });
})(window);
