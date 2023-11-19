import { BiSun } from 'react-icons/bi';
import styled from 'styled-components';

export const StyledSun = styled(BiSun)`
  color: white;
  font-size: 20px;

  &:hover {
    color: #778ca3;
    transform: scale(1.5);
  }

  &:active {
    transform: scale(1.3);
  }
`;
