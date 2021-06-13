import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: .5rem;
  top: 10px;

  span {
    width: 160px;
    background: #5965E7;
    padding: .5em;
    border-radius: .25em;
    font-size: .75em;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;
    position: absolute;
    bottom: calc(100% + .75em);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #5965E7 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.4s;
  }
`;
