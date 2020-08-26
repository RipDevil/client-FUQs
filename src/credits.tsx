import * as React from 'react';
import styled from 'styled-components';

const CreditsComponent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  font-size: 10px;
  transition: 500ms ease;
  &:hover {
    font-size: 12px;
    bacground-color: lightyellow;
  }
`;

const Credits: React.FC = () => {
  const development = process.env.NODE_ENV === 'development';
  return development ? (
    <CreditsComponent>
      <span>
        <a href='https://github.com/RipDevil' title='RipDevil github page'>
          Github
        </a>
        <a
          href='https://github.com/users/RipDevil/projects/1'
          title='Projects in github'>
          /fuq
        </a>
        <a
          href='https://github.com/RipDevil/client-FUQs'
          title='Client repo in github'>
          /cli
        </a>
      </span>
      <br />
      <span>
        <a href='https://ripdevil.github.io/#/' title='Github pages'>
          WebInstance
        </a>
      </span>
    </CreditsComponent>
  ) : null;
};

export default Credits;
