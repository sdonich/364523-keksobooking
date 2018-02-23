'use strict';

(function (global) {

  var getError = function (error) {
    var note = document.createElement('div');

    document.body.appendChild(note);
    note.classList.add('descript-notice');

    if (error.code === 0 || !error.code) {
      note.textContent = 'Произошла ошибка соединения с сервером. Проверьте интернет-соединение';
    } else if (error.code === 400) {
      note.textContent = 'Ошибка ' + error.code + '. ' + 'Ваши данные не соответсвуют требованиям';
    } else {
      note.textContent = 'Oops! Произошла ошибка: ' + error.code;
    }

    setTimeout(function () {
      note.remove();
    }, 2000);
  };

  var getSucces = function () {
    var note = document.createElement('div');

    document.body.appendChild(note);
    note.classList.add('descript-notice');
    note.textContent = 'Ваши данные успешно отправлены';

    setTimeout(function () {
      note.remove();
    }, 2000);
  };

  global.notice = {
    error: getError,
    succes: getSucces
  };

})(window);
