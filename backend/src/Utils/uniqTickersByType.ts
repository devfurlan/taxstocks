import TradingNote from '../models/TradingNote';

interface ITicker {
  ticker: string;
  quantity: number;
  price: number;
  total: number;
  date: Date;
}

export default function uniqTickersByType(tradingNotes: TradingNote[]) {
  const uniqTickers = tradingNotes.reduce((acc, note) => {
    const x = acc.find(item => item === note.ticker);
    return (!x) ? acc.concat(note.ticker) : acc;
  }, [] as string[]);

  const saleTickers = uniqTickers.map(ticker => {
    const existsNotes = tradingNotes.filter(note => note.ticker === ticker);

    return existsNotes.reduce((acc, note) => {
      const rawTotal = Number(note.total) + Number(acc.total ?? 0);
      const total = Number(rawTotal.toFixed(2));

      const quantity = Number(note.quantity) + Number(acc.quantity ?? 0);

      const price = Number((rawTotal / quantity).toFixed(2));

      return {
        ticker: note.ticker,
        quantity,
        price,
        total,
        date: note.date,
      };
    }, {} as ITicker);
  });

  return saleTickers;
}
