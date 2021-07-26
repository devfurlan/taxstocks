const getMonthName = (month: number): string => {
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const parsedMonth = month - 1;

  return monthNames[parsedMonth];
}

export default getMonthName;
