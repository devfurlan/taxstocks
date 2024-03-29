import styled from 'styled-components';
import { shade } from 'polished';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  .link_sign {
    width: fit-content;
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
    line-height: 1.85;
    margin-bottom: 2rem;
  }
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string => (total ? '#FF872C' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const Select = styled.select`
  margin-top: 30px;
  background: #3C3E5B;
  border: 1px solid #828392;
  border-radius: 5px;
  font-size: 14px;
  color: #D8D8D8;
  padding: 4px 8px;
`;

export const TableContainer = styled.section`
  margin-top: 15px;

  table {
    width: 100%;
    border-spacing: 0;

    th {
      padding: 8px;
      color: #D8D8D8;
      font-size: 12px;
      font-weight: normal;
      background-color: #5965E7;
    }

    td {
      padding: 8px;
      font-size: 14px;
      color: #D8D8D8;
      text-align: center;
      border-bottom: 1px solid #202234;
      background-color: #2C2F43;
    }
  }
`;
