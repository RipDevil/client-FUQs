import styled from 'styled-components';

export const PortalComponent = styled.div`
  position: fixed;
  top: 1vh;
  right: 0;
  z-index: 1001;
  overflow: hidden;
  font-size: 10px;
  transition: 500ms ease;
  &:hover {
    right: 10000 !important;
  }
`;
