import styled from 'styled-components';
import Tooltip from "../Tooltip";

export const Container = styled.div`
  position: relative;
  
  p {
    display: block;
    font: normal normal normal 12px/18px Poppins;
    color: #D8D8D8;
    text-align: left;
    margin-bottom: .5em;
  }
  
  label {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: #3C3E5B;
    margin-right: 15px;
    color: #D8D8D8;
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 14px;
    margin-bottom: 2rem;
    
    input {
      margin-right: 5px;
    }
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