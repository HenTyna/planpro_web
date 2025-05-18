export const dateFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const day = date.getDate();
  return `${year}, ${month} ${day}`;
}