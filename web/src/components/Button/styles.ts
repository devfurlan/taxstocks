import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 40px;
  font-weight: 700;
  color: #D8D8D8;
  padding: 0 1em;
  background: #5965E7;
  border: 0;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#5965E7')};
  }
`;
