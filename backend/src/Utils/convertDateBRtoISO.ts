import { format, parse } from 'date-fns';

export default function convertDateBRtoISO(date: string) {
  const dateParsed = parse(date, 'dd/MM/yyyy', new Date());

  const dateFormatted = format(dateParsed, 'yyyy-MM-dd');

  return new Date(dateFormatted);
}
