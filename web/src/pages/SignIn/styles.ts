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

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-56px);
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

  animation: ${appearFromLeft} 1s;

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
      display: block;
      color: #afb0bf;
      font-size: .66rem;
      text-align: right;
      margin: -1.5rem 0 1.5rem;
      transition: color 0.2s;
      
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  
  hr {
    border: 1px solid #828392;
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
    margin: 2rem auto 0;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#202234')};
      background: ${shade(0.2, '#4FEAC1')};
    }
  }
`;
