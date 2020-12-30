import styled from 'styled-components';

export const CreditsComponent = styled.div`
  position: fixed;
  top: 0;
  left: 10;
  z-index: 1001;
  overflow: hidden;
  font-size: 10px;
  transition: 500ms ease;
  &:hover {
    font-size: 12px;
    bacground-color: lightyellow;
  }
`;
