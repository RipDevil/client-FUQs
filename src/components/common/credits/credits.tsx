import * as React from 'react';
import { GithubOutlined } from '@ant-design/icons';

import { CreditsComponent } from './credits.styled';

export type CreditsTypes = {
  env: string;
};

export const Credits: React.FC<CreditsTypes> = ({ env }) => {
  return env === 'development' ? (
    <CreditsComponent>
      <span>
        <a href="https://github.com/RipDevil" title="RipDevil github page">
          <GithubOutlined />
        </a>
      </span>
    </CreditsComponent>
  ) : null;
};
