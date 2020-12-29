import * as React from 'react';
import { StyledSpinner as S } from './commonStyled';

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
      <S.BackgroundDiv />
      <S.SpinnerDiv>
        <div>
          <i className='fas fa-10x fa-spin fa-cog' />
        </div>
        {text && (
          <S.TextDiv>
            <h3>{text}</h3>
          </S.TextDiv>
        )}
      </S.SpinnerDiv>
    </>
  );
};

export default Spinner;
