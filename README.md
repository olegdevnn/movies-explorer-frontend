# Каталог Фильмов (Frontend React)

### Обзор

* Описание работы
* Используемые технологии
* Установка и настройка

**Описание**

Проект каталог фильмов.

**Используемые технологии**

* Проект сверстан из макета в Figma.
* Применена резиновая и адаптивная верстка.
* Применены технологии: Flex, Grid-layout, media-запросы.
* UX интерфейс
* Разработан на ReactJS, ES6. Применен функциональный подход.
* Использованы хуки useState, useEffect, useContext, useHistory
* Работа c Api
* JWT аутентификация через cookie
* Статическая типизация при помощи propTypes
* Применена базовая защита сайта CORS, CSRF и другие
* Стилизация кода ESLint, StyleLint

**Сайт**

* https://oleg-zvonilov-diploma.students.nomoredomains.monster

**Установка**

`npm install` — устанавливает необходимые пакеты

`npm run build` — собирает сайт в директории `build/` в рабочем режиме

`npm run start` — запускает сайт (режим разработчика)

`npm audit` - запускает проверку уязвимостей пакетов

**Настройка**

- Бекенд Api: [utils/MainApi.js](src/utils/MainApi.js)
- Сервер фильмов Api (сторонний): [utils/MoviesApi.js](src/utils/MoviesApi.js)
- Безопасность: [public/index.html](public/index.html)
- Другое: [utils/config.js](src/utils/config.js)

