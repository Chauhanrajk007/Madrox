import { format, isToday as isTodayFn, isTomorrow as isTomorrowFn, addDays, parseISO } from 'date-fns';

export const formatAppointmentDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isTodayFn(dateObj)) {
    return 'Today';
  }
  
  if (isTomorrowFn(dateObj)) {
    return 'Tomorrow';
  }
  
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatAppointmentTime = (time: string): string => {
  return time;
};

export const getUpcomingDays = (days: number): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    dates.push(addDays(today, i));
  }
  
  return dates;
};

export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isTodayFn(dateObj);
};

export const isTomorrow = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isTomorrowFn(dateObj);
};

export const formatDateForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEEE, MMMM dd, yyyy');
};

export const formatTimeForDisplay = (time: string): string => {
  // Assumes time is in HH:mm format
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};
