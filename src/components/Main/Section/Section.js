import './Section.css';
import React from 'react';

import PropTypes from 'prop-types';

const Section = ({
  children, title, id, theme,
}) => (
  <section className={`section ${theme ? `section_${theme}` : ''}`} id={id}>
    <h2 className="section__title">{title}</h2>
    {children}
  </section>
);

Section.propTypes = {
  id: PropTypes.string,
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Section.defaultProps = {
  id: '',
  theme: '',
};

export default Section;
