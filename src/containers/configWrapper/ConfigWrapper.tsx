import React, { ReactNode, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { IntlProvider } from 'react-intl';

import { configUpdate } from 'effects/config';

type ConfigWrapperProps = {
  children: ReactNode
};

const ConfigWrapper = ({ children }: ConfigWrapperProps): JSX.Element => { ///config.json
  const { data: config, isSuccess, isLoading, isError, error } = useQuery('fetchConfig', () => axios.get('/config.json').then(res => res.data));
  const locale = navigator.language;

  useEffect(() => {
    console.log('CONFIG :>> ', config);
    isSuccess && configUpdate(config);
  }, [isSuccess, config]);

  return (
    <IntlProvider messages={{}} locale={locale} defaultLocale="ru">
      {isLoading && <i className="fab fa-accessible-icon" />}
      {isSuccess && (
        <div>
          {children}
        </div>
      )}
    </IntlProvider>
  );
};

export default ConfigWrapper;
