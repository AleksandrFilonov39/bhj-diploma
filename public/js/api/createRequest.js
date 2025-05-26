/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
// const createRequest = (options = {}) => {

// const xhr = new XMLHttpRequest ();
// xhr.responseType = 'json';
// let formData = new FormData();

// if (options.method === 'GET') {
//         options.url += '?';
//     for (const key in options.data) {
//         options.url += `${key}=${options.data[key]}&`;
//     }
//     options.url = options.url.slice(0, options.url.length - 1);
// } else {
//     for (const key in options.data) {
//          formData.append(key, options.data[key])
//     }
// }

// // xhr.onreadystatechange = () => {
// //     if (xhr.readyState === 4 && xhr.status === 200) {
// //       options.callback(null, xhr.response);
// //     }
// //   }

// xhr.open(options.method, options.url, true);
//   try {
//     xhr.send(formData);
//   } catch (err) {
//     options.callback(err, null);
//   }

//   xhr.addEventListener("readystatechange", function () {
//       if (xhr.status === 200 && xhr.readyState === xhr.DONE) {
//         options.callback(null, xhr.response)
//       }
//     })
// };

const createRequest = async (options = {}) => {

  const{method, url, data, callback } = options;

  try {
    let fetchOptions = {
      method: method,
      headers: {}
    };

    let formData = new FormData();

    if (method === 'GET') {
          options.url += '?';
      for (const key in data) {
          options.url += `${key}=${data[key]}&`;
      }
      options.url = options.url.slice(0, options.url.length - 1);
    } else {
        for (const key in data) {
            formData.append(key, data[key])
        }
        fetchOptions.body = formData;
    }

    const response = await fetch (options.url, fetchOptions);
    if(!response.ok) {
        throw new Error(`Could not fetch ${response.status}`);
    }

    const responseData = await response.json();
    callback(null, responseData);

  }catch (e) {
    callback(e, null);
  }
};

