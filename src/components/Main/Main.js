import React from 'react';

import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import Portfolio from './Portfolio/Portfolio';
import Promo from './Promo/Promo';
import Section from './Section/Section';
import Techs from './Techs/Techs';

const Main = () => (
  <main className="main">
    <Promo />
    <Section
      title="О проекте"
      id="aboutProject"
      theme="theme_info"
    >
      <AboutProject />
    </Section>
    <Section
      title="Технологии"
      id="techs"
      theme="theme_gray"
    >
      <Techs />
    </Section>
    <Section
      title="Студент"
      id="aboutMe"
    >
      <AboutMe />
      <Portfolio />
    </Section>
  </main>
);

export default Main;
