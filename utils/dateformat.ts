export const dateFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const day = date.getDate();
  return `${year}, ${month} ${day}`;
}

export const formatDateCard = (date: string): string => {
  // 20250510000000 -> DD MMM
  const dateObj = new Date(
    parseInt(date.substring(0, 4)),
    parseInt(date.substring(4, 6)) - 1,
    parseInt(date.substring(6, 8))
  );
  const month = new Intl.DateTimeFormat('en-US', { month:'short' }).format(dateObj);
  const day = dateObj.getDate();
  return `${day} ${month}`;
}


 export const getDaysBetween = (startDate: Date, endDate: Date) => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export const getDaysUntilTrip = (startDate: Date) => {
  const today = new Date()
  const diffTime = startDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}