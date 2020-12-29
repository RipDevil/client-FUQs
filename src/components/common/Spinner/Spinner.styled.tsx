import styled from 'styled-components';

export interface BackgroundDivProps {
  transparent: boolean;
  theme: object | undefined;
};

export const SpinnerDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  margin: -50px 0px 0px -50px;
  max-width: 140px;
`;

export const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: ${(props: BackgroundDivProps): string =>
    props.transparent ? 'rgba(253, 253, 253, 0.3)' : 'rgba(253, 253, 253, 1)'};
`;

export const TextDiv = styled.div`
  text-align: center;
  margin-top: 1rem;
`;
