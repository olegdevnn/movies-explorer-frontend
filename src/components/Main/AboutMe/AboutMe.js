import './AboutMe.css';
import React from 'react';

import profile from '../../../images/demo-photo-profile.png';
import Socials from './Socials/Socials';

const AboutMe = () => (
  <section className="about-me">
    <div className="about-me__column-info">
      <h3 className="about-me__title">Виталий</h3>
      <p className="about-me__preview">Фронтенд-разработчик, 30 лет</p>
      <p className="about-me__description">
        Я родился и живу в Саратове, закончил факультет экономики СГУ.
        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
        Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
        После того, как прошёл курс по веб-разработке, начал заниматься
        фриланс-заказами и ушёл с постоянной работы.
      </p>
      <Socials />
    </div>
    <img
      src={profile}
      alt="Студент"
      className="about-me__column-photo"
    />
  </section>
);

export default AboutMe;
