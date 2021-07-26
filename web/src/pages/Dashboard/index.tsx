import React, { ChangeEventHandler, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import api from '../../services/api';
import Header from '../../components/Header';
import formatValue from '../../utils/formatValue';
import getMonthName from '../../utils/getMonthName';
import {
    Container,
    Title,
    TableContainer,
    Select,
} from './styles';
import { Link } from 'react-router-dom';

interface IYear {
    year: number;
}

interface ITaxes {
    month: number;
    balance: number;
    swing_balance: number;
    day_balance: number;
    sale: number;
    swing_sale: number;
    day_sale: number;
    tax: number;
    swing_tax: number;
    day_tax: number;
}

const Dashboard: React.FC = () => {
    const [taxes, setTaxes] = useState<ITaxes[]>([]);
    const [year, setYear] = useState<number>();
    const [yearsList, setYearsList] = useState<IYear[]>([]);

    useEffect(() => {
        async function loadTaxes(): Promise<void> {
            const response = await api.get(`/tax-calculation/${year}`);

            const taxesFormatted = response.data.map(
                    (tax: ITaxes) => ({
                        ...tax,
                        balance: formatValue(tax.balance),
                        swing_balance: formatValue(tax.swing_balance),
                        day_balance: formatValue(tax.day_balance),
                        sale: formatValue(tax.sale),
                        swing_sale: formatValue(tax.swing_sale),
                        day_sale: formatValue(tax.day_sale),
                        tax: formatValue(tax.tax),
                        swing_tax: formatValue(tax.swing_tax),
                        day_tax: formatValue(tax.day_tax),
                    }),
            );

            setTaxes(taxesFormatted);
        }

        loadTaxes();
    }, [year]);

    const handleYear: ChangeEventHandler<HTMLSelectElement> = data => {
        const yearSelected = Number(data.target.value);
        setYear(yearSelected);
    };

    useEffect(() => {
        async function loadYears(): Promise<void> {
            const response = await api.get(`/tax-calculation/years`);

            if (response.data.length) {
                const years = response.data.map((year: IYear) => ({ ...year }));
                setYearsList(years);

                const year = response.data[0].year;
                setYear(year);
            }
        }

        loadYears();
    }, []);


    return (
            <>
                <Header/>
                <Container>
                    <Title>
                        Calculadora DARF
                        <small>
                            Na tabela abaixo estão os resultados dos cálculos de DARF mensal, com base nas notas de
                            corretagem enviadas.<br/>
                            Verifique se todas as notas foram enviadas antes de realizar o pagamento da sua DARF.
                        </small>
                    </Title>

                    {!taxes.length && (
                      <Link to="/import" className="link_sign">
                          Enviar notas
                      </Link>
                    )}
                    {!!taxes.length && (
                      <>
                          <Select name="year" onChange={handleYear}>
                              {yearsList.map(option => (
                                <option key={option.year} value={option.year}>
                                    {option.year}
                                </option>
                              ))}
                          </Select>

                          <TableContainer>
                              <table>
                                  <thead>
                                  <tr>
                                      <th>Mês</th>
                                      <th>Resultado Swing</th>
                                      <th>Resultado Day</th>
                                      <th>Resultado</th>
                                      <th>Vendas Swing</th>
                                      <th>Vendas Day</th>
                                      <th>Total em vendas</th>
                                      <th>Total DARF</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {taxes.map(tax => (
                                    <tr key={tax.balance}>
                                        <td className="title">{getMonthName(tax.month)}</td>
                                        <td>{tax.swing_balance}</td>
                                        <td>{tax.day_balance}</td>
                                        <td>{tax.balance}</td>
                                        <td>{tax.swing_sale}</td>
                                        <td>{tax.day_sale}</td>
                                        <td>{tax.sale}</td>
                                        <td>{tax.tax}</td>
                                    </tr>
                                  ))}
                                  </tbody>
                              </table>
                          </TableContainer>
                      </>
                    )}
                </Container>
            </>
    );
};

export default Dashboard;
