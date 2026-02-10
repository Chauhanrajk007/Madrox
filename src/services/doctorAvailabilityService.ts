import { TimeSlot } from '@/types/appointments';
import { getAppointments } from './appointmentService';

export const getDoctorAvailability = (
  doctorId: string,
  date: Date
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const appointments = getAppointments({ doctorId });

  // Generate time slots from 9 AM to 6 PM
  for (let hour = 9; hour < 18; hour++) {
    // Skip lunch break (1 PM - 2 PM)
    if (hour === 13) continue;

    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Check if this slot is already booked
      const isBooked = appointments.some(apt => {
        const aptDate = new Date(apt.appointmentDate);
        const isSameDay = 
          aptDate.getDate() === date.getDate() &&
          aptDate.getMonth() === date.getMonth() &&
          aptDate.getFullYear() === date.getFullYear();
        
        return isSameDay && apt.appointmentTime === time && 
          (apt.status === 'scheduled' || apt.status === 'rescheduled');
      });

      slots.push({
        time,
        available: !isBooked,
        duration: 30,
        consultationType: 'in-person',
      });
    }
  }

  return slots;
};

export const getNextAvailableSlot = (
  doctorId: string
): { date: Date; time: string } | null => {
  const today = new Date();
  
  // Check next 30 days
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() + i);
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    const dayOfWeek = checkDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    const slots = getDoctorAvailability(doctorId, checkDate);
    const availableSlot = slots.find(slot => slot.available);
    
    if (availableSlot) {
      return {
        date: checkDate,
        time: availableSlot.time,
      };
    }
  }

  return null;
};

export const isSlotAvailable = (
  doctorId: string,
  date: Date,
  time: string
): boolean => {
  const slots = getDoctorAvailability(doctorId, date);
  const slot = slots.find(s => s.time === time);
  return slot?.available || false;
};
