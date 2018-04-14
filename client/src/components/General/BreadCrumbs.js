import React from 'react';
import { Link } from 'react-router-dom';

import TextContainer from './TextContainer';

const BreadCrumbs = ({ crumbPages }) => {
  function renderCrumbs() {
    return crumbPages.map(page => {
      return (
        <Link to={page.link} className="breadcrumb">
          {page.name}
        </Link>
      );
    });
  }

  return (
    <TextContainer color="grey darken-4">
      <div className="col s12">{renderCrumbs()}</div>
    </TextContainer>
  );
};

export default BreadCrumbs;