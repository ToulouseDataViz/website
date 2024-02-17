import React from 'react';
import Button from '../components/Button';

const HackavizFooter = () => (
  <div>
    <header class="major">
      <h2>{'EDITIONS PRECEDENTES'}</h2>
      <Button link={'/hackaviz/editions-precedentes'} type={'internal'} text={'Afficher'} />
    </header>
  </div>
);

export default HackavizFooter;
