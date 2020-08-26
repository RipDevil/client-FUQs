import styled from 'styled-components';

export const StyledSpinner = {
  SpinnerDiv: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
    margin: -50px 0px 0px -50px;
    max-width: 140px;
  `,
  BackgroundDiv: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgb(255, 255, 255);
  `,
  TextDiv: styled.div`
    text-align: center;
    margin-top: 1rem;
  `,
};
