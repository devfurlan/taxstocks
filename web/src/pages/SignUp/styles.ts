import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  max-width: 440px;
  margin: 13vh auto 0;
  background: #2C2F43;
  border-radius: 5px;
`;

export const Content = styled.div`
  padding: 2rem;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(56px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  width: 100%;
  max-width: 440px;
  margin: 0 auto;

  animation: ${appearFromRight} 1s;

  form {
    width: 385px;
    margin: 2em 0;

    h1 {
      color: #5965E7;
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 1em;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 1.5em;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 1em;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  hr {
    border: 1px solid #828392;
  }
  
  p {
    margin: 2rem 0 0 0;
    color: #D8D8D8;
    text-align: center;
    font: normal normal normal 14px/21px Poppins;
  }

  .link_sign {
    width: fit-content;
    display: block;
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    color: #202234;
    padding: .5rem 1.5rem;
    background-color: #4FEAC1;
    border-radius: 5px;
    margin: 1rem auto 0;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#202234')};
      background: ${shade(0.2, '#4FEAC1')};
    }
  }
`;