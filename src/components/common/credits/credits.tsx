import * as React from 'react';

import { CreditsComponent } from './credits.styled';

export const Credits: React.FC = () => {
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
