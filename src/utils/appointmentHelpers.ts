import { Appointment } from '@/types/appointments';
import { isAfter, isBefore, addHours } from 'date-fns';

export const canCancelAppointment = (appointment: Appointment): boolean => {
  // Can cancel if:
  // 1. Status is scheduled or rescheduled
  // 2. Appointment is more than 2 hours away
  
  if (appointment.status !== 'scheduled' && appointment.status !== 'rescheduled') {
    return false;
  }
  
  const appointmentDateTime = new Date(appointment.appointmentDate);
  const [hours, minutes] = appointment.appointmentTime.split(':').map(Number);
  appointmentDateTime.setHours(hours, minutes);
  
  const twoHoursFromNow = addHours(new Date(), 2);
  
  return isAfter(appointmentDateTime, twoHoursFromNow);
};

export const canRescheduleAppointment = (appointment: Appointment): boolean => {
  // Same logic as cancel
  return canCancelAppointment(appointment);
};

export const calculateAppointmentStatus = (appointment: Appointment): string => {
  if (appointment.status === 'cancelled') return 'Cancelled';
  if (appointment.status === 'completed') return 'Completed';
  if (appointment.status === 'no-show') return 'No Show';
  
  const appointmentDateTime = new Date(appointment.appointmentDate);
  const [hours, minutes] = appointment.appointmentTime.split(':').map(Number);
  appointmentDateTime.setHours(hours, minutes);
  
  const now = new Date();
  
  if (isBefore(appointmentDateTime, now)) {
    return 'Past Due';
  }
  
  if (appointment.status === 'rescheduled') return 'Rescheduled';
  
  return 'Scheduled';
};

export const getAppointmentUrgency = (appointment: Appointment): 'today' | 'week' | 'later' => {
  const appointmentDateTime = new Date(appointment.appointmentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const appointmentDay = new Date(appointmentDateTime);
  appointmentDay.setHours(0, 0, 0, 0);
  
  if (appointmentDay.getTime() === today.getTime()) {
    return 'today';
  }
  
  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  
  if (isBefore(appointmentDateTime, oneWeekFromNow)) {
    return 'week';
  }
  
  return 'later';
};
