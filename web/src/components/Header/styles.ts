import styled from 'styled-components';

export const Container = styled.div`
  background: #5965E7;
  padding: 15px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 14px;
        transition: .2s all linear;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          color: #4FEAC1;
          transition: .2s all linear;
        }
      }
    }

    .active {
      color: #4FEAC1;
    }
  }
`;
