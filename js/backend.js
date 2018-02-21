'use strict';

(function (global) {
  var URL = 'https://js.dump.academy/keksobooking';
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';

  global.backend = {
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          var error = 'Oops! Произошла ошибка: ' + xhr.status;
          onError(error);
        } else {
          onLoad();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {

        if (xhr.status !== 200) {
          var error = 'Oops! Произошла ошибка: ' + xhr.status;
          onError(error);
        } else {
          onLoad(xhr.response);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения c сервером');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не смог выполниться за ' + xhr.timeout + ' cек.');
      });
      xhr.timeout = 10000;

      xhr.open('GET', URL_DATA);
      xhr.send();
    }
  };
})(window);
