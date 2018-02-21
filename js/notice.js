'use strict';

(function (global) {

  var getError = function (error) {
    var note = document.createElement('div');

    document.body.appendChild(note);
    note.classList.add('descript-notice');

    if (error) {
      note.textContent = error;
    } else {
      note.textContent = 'Ошибка отправки формы. Проверьте интернет-соединение';
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
