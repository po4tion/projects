import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import styled from 'styled-components';

const StyledArrowUp = styled(AiOutlineArrowUp)`
  font-size: 18px;
  color: ${({ color }) => color};
  margin-bottom: 3px;
`;

function Arrow({ color }) {
  return <StyledArrowUp color={color} />;
}

export default Arrow;
