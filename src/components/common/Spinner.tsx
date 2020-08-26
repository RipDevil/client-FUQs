import * as React from 'react';
import styled from 'styled-components';

const SpinnerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0px 0px -50px;
`;

export interface SpinnerProps {
  text?: string;
  transparent?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  text = '',
  transparent = false, // TODO: implement this stuff
}) => {
  return (
    <SpinnerDiv>
      <div>
        <i className='fas fa-10x fa-spin fa-cog' />
      </div>
      {text && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <h3>Test</h3>
        </div>
      )}
    </SpinnerDiv>
  );
};

export default Spinner;
