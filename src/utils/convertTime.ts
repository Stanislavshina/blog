import { format } from 'date-fns';

export const converTime = (time: string) => {
  const date = new Date(time);
  return format(date, 'MMMM d, yyyy');
};
