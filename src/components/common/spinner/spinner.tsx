import { FC } from 'react';
import { Typography } from 'antd';

import { BackgroundDiv, SpinnerDiv, TextDiv } from './spinner.styled';

const { Title } = Typography;

export type SpinnerProps = {
  text?: string;
  transparent?: boolean;
};

export const Spinner: FC<SpinnerProps> = ({ text = '', transparent = false }) => {
  return (
    <>
      <BackgroundDiv transparent={transparent} />
      <SpinnerDiv>
        <div>
          <i className="fas fa-10x fa-spin fa-cog" />
        </div>
        <TextDiv>
          <Title level={3} type="danger" ellipsis>
            {text}
          </Title>
        </TextDiv>
      </SpinnerDiv>
    </>
  );
};
