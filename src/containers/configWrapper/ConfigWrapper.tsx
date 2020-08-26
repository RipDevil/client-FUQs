import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { IntlProvider } from 'react-intl';

import { ConfigWrapperProps } from './configWrapperTypes';
import { configUpdate } from 'effects/config';

const ConfigWrapper = ({ children }: ConfigWrapperProps): JSX.Element => {
  const { data: config, isSuccess, isLoading } = useQuery('fetchConfig', () =>
    axios.get('/config.json').then((res) => res.data)
  );
  const locale = navigator.language;

  useEffect(() => {
    console.log('CONFIG :>> ', config);
    isSuccess && configUpdate(config);
  }, [isSuccess, config]);

  return (
    <IntlProvider messages={{}} locale={locale} defaultLocale='ru'>
      {isLoading && <i className='fab fa-spin fa-accessible-icon' />}
      {isSuccess && <div>{children}</div>}
    </IntlProvider>
  );
};

export default ConfigWrapper;
