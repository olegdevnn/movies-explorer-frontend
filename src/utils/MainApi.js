/**
 * Url api
 * @type {string}
 */

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * Класс для работы с api сервера проекта 'Каталог фильмов'
 * Результат ответа зависит от запросов или сообщение об ошибке
 */
class MainApi {
  /**
     * Создать Api
     * @param {object} config - Данные (baseUrl - url сервера, headers - заголовки)
     */
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = new Headers(config.headers);
    this.headerWithContentType = new Headers(config.headers);
    this.headerWithContentType.append('Content-Type', 'application/json');
  }

  /**
     * Возвращает cookies csrf
     * @returns {Promise} - Промис объект с пустым телом
     */
  getToken() {
    return fetch(`${this.baseUrl}/getToken`, {
      method: 'GET',
      headers: new Headers(this.headers),
      credentials: 'include',
    });
  }

  /**
     * Регистрация пользователя
     * @param {object} data - данные (name, email, password)
     * @returns {Promise} - Промис объект с данными пользователя
     */
  register({ name, email, password }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headerWithContentType,
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    }).then((res) => MainApi.checkStatus(res, 201));
  }

  /**
     * Авторизация
     * @param {object} data - данные (email, password)
     * @returns {Promise} - Промис объект с сообщением об успешной авторизации
     */
  login({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headerWithContentType,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then((res) => MainApi.checkStatus(res, 200));
  }

  /**
     * Выход из системы
     * @returns {Promise} - Промис объект с сообщением об успешном выходе из
     * системы
     */
  logout() {
    return fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => MainApi.checkStatus(res, 200));
  }

  /**
     * Возвращает данные пользователя
     * Нужна авторизация
     * @returns {Promise} - Промис объект с данными пользователя
     */
  userMe() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => MainApi.checkStatus(res, 200));
  }

  /**
     * Сохраняет данные пользователя
     * Нужна авторизация
     * @param {object} data - данные (name, email)
     * @returns {Promise} - Промис объект с обновленными данными пользователя
     */
  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headerWithContentType,
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => MainApi.checkStatus(res, 200));
  }

  /**
     * Добавляет фильм в сохраненные
     * Нужна авторизация
     * @param {object} data - данные фильма
     * @returns {Promise} - Промис объект с данными добавленной карточки
     */
  addMovie(data) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: this.headerWithContentType,
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => MainApi.checkStatus(res, 201));
  }

  /**
     * Удаляет фильм из сохраненных
     * Нужна авторизация
     * @param {string} movieId - Id
     * @returns {Promise} - Промис объект с данными удаленной карточки
     */
  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => MainApi.checkStatus(res, 200));
  }

  /**
     * Получение списка сохраненных фильмов
     * Нужна авторизация
     * @returns {Promise} - Промис объект с массивом фильмов
     */
  getInitialMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      headers: this.headers,
      credentials: 'include',
    }).then((res) => MainApi.checkStatus(res, 200));
  }

  /**
     * Функция сравнивания статуса ответа
     * @param res - необработанные данные с сервера
     * @param status - статус который ожидается
     * @returns {Promise} - данные json формате или сообщение об ошибке
     */
  static async checkStatus(res, status) {
    if (res.status === status) {
      return res.json();
    }

    const { message } = await res.json();

    const error = new Error(message);
    error.status = res.status;

    throw error;
  }
}

export default new MainApi({
  baseUrl: apiBaseUrl,
  headers: {
    Accept: 'application/json',
    Cache: 'no-cache',
  },
});
