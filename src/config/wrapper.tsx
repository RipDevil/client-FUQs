import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useStore } from 'effector-react';
import { IntlProvider } from 'react-intl';

import { Spinner } from 'components/common';
import { configUpdate, $config, ConfigType } from './model';

export const ConfigWrapper: React.FC = ({ children }) => {
  const { data: config, isSuccess, isLoading } = useQuery('fetchConfig', () =>
    axios.get('/config.json').then((res): ConfigType => res.data)
  );

  const { server } = useStore($config);

  const locale = navigator.language;

  useEffect(() => {
    isSuccess && config && configUpdate(config);
  }, [isSuccess, config]);

  return (
    <IntlProvider messages={{}} locale={locale} defaultLocale='ru'>
      {isLoading && <Spinner transparent={false} text='Loading config' />}
      {isSuccess && server && <div>{children}</div>}
    </IntlProvider>
  );
};
