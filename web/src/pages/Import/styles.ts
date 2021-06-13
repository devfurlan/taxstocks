import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: #D8D8D8;
  text-transform: uppercase;
  
  small{
    font-weight: 400;
    font-size: 14px;
    display: block;
    margin-top: 15px;
    text-transform: initial;
  }
`;

export const ImportFileContainer = styled.section`
  margin-top: 30px;
`;

export const Footer = styled.section`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 18px;
    color: #D8D8D899;

    img {
      width: 16px;
      margin-right: 5px;
    }
  }

  button {
    background: #5965E7;
    font-size: 14px;
    font-weight: 700;
    color: #D8D8D8;
    border-radius: 5px;
    padding: 8px 15px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#5965E7')};
    }
  }
`;
