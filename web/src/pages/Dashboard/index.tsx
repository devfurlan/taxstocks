import React, { useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import api from '../../services/api';
import Header from "../../components/Header";
import formatValue from '../../utils/formatValue';
import {
  Container,
  Title,
  TableContainer, SelectYear
} from './styles';

interface ITransaction {
  id: string;
  code: string;
  ticker: string;
  quantity: number;
  type: 'buy' | 'sale';
  price: number;
  trade: 'D' | 'S';
  date: Date;
  formattedPrice: string;
  formattedDate: string;
  created_at: Date;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/trading-notes');

      const transactionsFormatted = response.data.map(
          (transaction: ITransaction) => ({
            ...transaction,
            formattedPrice: formatValue(transaction.price),
            formattedDate: new Date(transaction.created_at).toLocaleDateString(
                'pt-BR',
            ),
          }),
      );

      setTransactions(transactionsFormatted);
    }

    loadTransactions();
  }, []);

  return (
      <>
        <Header />
        <Container>
          <Title>
            Calculadora DARF
            <small>
              Na tabela abaixo estão os resultados dos cálculos de DARF mensal, com base nas notas de corretagem enviadas. Verifique se todas as notas foram enviadas antes de realizar o pagamento da sua DARF.
            </small>
          </Title>

          <SelectYear>
            <option>2020</option>
            <option>2021</option>
          </SelectYear>

          <TableContainer>
            <table>
              <thead>
              <tr>
                <th>Mês</th>
                <th>Resultado</th>
                <th>Prejuízo a compensar</th>
                <th>Total em vendas</th>
                <th>Base de cálculo</th>
                <th>Total DARF</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Janeiro</td>
                  <td>R$ 1.018,23</td>
                  <td>R$ 0,00</td>
                  <td>R$ 13.359,15</td>
                  <td>R$ 17,86</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Fevereiro</td>
                  <td>R$ 181,98	</td>
                  <td>R$ 0,00</td>
                  <td>R$ 1.755,00</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Março</td>
                  <td>R$ -1.649,17</td>
                  <td>R$ 1.649,17</td>
                  <td>R$ 11.770,30</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Abril</td>
                  <td>R$ -126,55</td>
                  <td>R$ 1.775,71</td>
                  <td>R$ 3.582,21</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Maio</td>
                  <td>R$ 0,00</td>
                  <td>R$ 1.775,71</td>
                  <td>R$ 0,00</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Junho</td>
                  <td>R$ 1.120,25</td>
                  <td>R$ 1.775,71</td>
                  <td>R$ 4.017,58</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Julho</td>
                  <td>R$ 180,94</td>
                  <td>R$ 1.775,71</td>
                  <td>R$ 2.995,12</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Agosto</td>
                  <td>R$ 1.234,02</td>
                  <td>R$ 1.775,71</td>
                  <td>R$ 8.066,60</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Setembro</td>
                  <td>R$ -4.968,86</td>
                  <td>R$ 6.748,06</td>
                  <td>	R$ 24.740,57</td>
                  <td>R$ 3,49</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Outubro</td>
                  <td>R$ 565,75</td>
                  <td>R$ 6.182,31</td>
                  <td>R$ 35.571,96</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Novembro</td>
                  <td>R$ 2.988,30</td>
                  <td>R$ 3.194,01</td>
                  <td>R$ 100.203,19	</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                <tr>
                  <td>Dezembro</td>
                  <td>R$ 1.601,67</td>
                  <td>R$ 1.592,34</td>
                  <td>R$ 143.571,43</td>
                  <td>R$ 0,00</td>
                  <td><strong>R$ 0,00</strong></td>
                </tr>
                {/*{transactions.map(transaction => (*/}
                {/*  <tr key={transaction.id}>*/}
                {/*    <td className="title">{transaction.ticker}</td>*/}
                {/*    <td className={transaction.type}>*/}
                {/*      {transaction.type === 'buy' && '- '}*/}
                {/*      {transaction.formattedPrice}*/}
                {/*    </td>*/}
                {/*    <td>{transaction.quantity}</td>*/}
                {/*    <td>{transaction.formattedDate}</td>*/}
                {/*  </tr>*/}
                {/*))}*/}
              </tbody>
            </table>
          </TableContainer>
        </Container>
      </>
  );
};

export default Dashboard;
