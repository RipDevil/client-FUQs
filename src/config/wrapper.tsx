import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { IntlProvider } from 'react-intl';

import { Spinner } from 'components/common';
import { configUpdate, $config } from './model';
import { useConfig } from 'api';

export const ConfigWrapper: React.FC = ({ children }) => {
  const { server } = useStore($config);
  const { data: config, isSuccess, isLoading } = useConfig();

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
