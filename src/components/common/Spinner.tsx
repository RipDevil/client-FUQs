import * as React from 'react';

export interface SpinnerProps {
  text?: string;
  transparent?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  text = '',
  transparent = false, // TODO: implement this stuff
}) => {
  return (
    <div className={`spinner ${transparent ? 'transparent' : ''}`}>
      <div>
        <i className='fas fa-10x fa-spin fa-cog' />
      </div>
      {text && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <h3>Test</h3>
        </div>
      )}
    </div>
  );
};

export default Spinner;
