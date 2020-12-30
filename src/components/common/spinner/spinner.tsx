import * as React from 'react';
import { Typography } from 'antd';

import { BackgroundDiv, SpinnerDiv, TextDiv } from './spinner.styled';

const { Title } = Typography;

export interface SpinnerProps {
  text?: string;
  transparent?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({
  text = '',
  transparent = false, // TODO: implement this stuff
}) => {
  return (
    <>
      <BackgroundDiv transparent={transparent} />
      <SpinnerDiv>
        <div>
          <i className='fas fa-10x fa-spin fa-cog' />
        </div>
        {text && (
          <TextDiv>
            <Title level={3} type='danger'>
              {text}
            </Title>
          </TextDiv>
        )}
      </SpinnerDiv>
    </>
  );
};
