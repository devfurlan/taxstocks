import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Label = styled.label`
  display: block;
  font: normal normal normal 12px/18px Poppins;
  color: #D8D8D8;
  text-align: left;
  margin-bottom: .5em;
`;

export const Container = styled.div<IContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  margin-bottom: 2rem;

  ${props => props.isErrored && css`
    border-color: #c53030;
  `}
  ${props => props.isFocused && css`
    color: #5965E7;
    border-color: #5965E7;
  `}
  ${props => props.isFilled && css`
    color: #5965E7;
  `}
  input {
    width: 100%;
    height: 2.5rem;
    font-size: 14px;
    color: #D8D8D8;
    border: 1px solid #3C3E5B;
    border-radius: 5px;
    padding: 0 1rem;
    background: #3C3E5B;

    &::placeholder {
      color: #858593;
    }

    ::-webkit-calendar-picker-indicator {
      filter: invert(.8);
    }
  }

  > svg {
    min-width: 1em;
  }
`;

export const Error = styled(Tooltip)`
  span {
    background: #c53030;
    color: #f4ede8;
    
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
