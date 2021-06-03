import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PortalComponent = styled.div`
  position: fixed;
  top: 1vh;
  right: 0;
  z-index: 1001;
  overflow: hidden;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  transition: 500ms ease;
  &:hover {
    right: 10000 !important;
  }
`;

export const LinkStyled = styled(Link)`
  margin-bottom: 1em;
`;
