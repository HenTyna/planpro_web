import moment from "moment";

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

export const getDaysBetween = (startDate: string, endDate: string): number => {
  // Parse YYYYMMDDHHmmss format
  const start = moment(startDate, "YYYYMMDDHHmmss");
  const end = moment(endDate, "YYYYMMDDHHmmss");
  return Math.abs(end.diff(start, 'days'));
}

export const getDaysUntilTrip = (startDate: string): number => {
  const today = new Date();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  
  // Parse YYYYMMDDHHmmss format
  const year = parseInt(startDate.substring(0, 4));
  const month = parseInt(startDate.substring(4, 6)) - 1; // Month is 0-based
  const day = parseInt(startDate.substring(6, 8));
  const tripDate = new Date(year, month, day);
  
  const diffTime = tripDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / MS_PER_DAY);
  return diffDays;
}


export const formatDateTime = (value: any) => {
  if (!value) {
      return "";
  }
  return moment(value, "YYYYMMDD").format("YYYYMMDDHHmmss")
}

export const formatDate = (value: any) => {
  if (!value) {
      return "";
  }
  return moment(value, "YYYYMMDDHHmmss").format("MMM, DD YYYY")
}