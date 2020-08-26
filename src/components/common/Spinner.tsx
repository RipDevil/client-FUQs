import * as React from 'react';
import { StyledSpinner as s } from './commonStyled';

export interface SpinnerProps {
  text?: string;
  transparent?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  text = '',
  transparent = false, // TODO: implement this stuff
}) => {
  return (
    <>
      <s.BackgroundDiv />
      <s.SpinnerDiv>
        <div>
          <i className='fas fa-10x fa-spin fa-cog' />
        </div>
        {text && (
          <s.TextDiv>
            <h3>{text}</h3>
          </s.TextDiv>
        )}
      </s.SpinnerDiv>
    </>
  );
};

export default Spinner;
