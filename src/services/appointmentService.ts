import { Appointment, AppointmentFilter, AppointmentType, AppointmentLocation } from '@/types/appointments';
import { mockAppointments } from '@/data/appointments';
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/localStorageHelpers';

const STORAGE_KEY = 'appointments';

// Initialize from localStorage or use mock data
const getStoredAppointments = (): Appointment[] => {
  const stored = loadFromLocalStorage<Appointment[]>(STORAGE_KEY, []);
  return stored.length > 0 ? stored : mockAppointments;
};

let appointments: Appointment[] = getStoredAppointments();

const saveAppointments = () => {
  saveToLocalStorage(STORAGE_KEY, appointments);
};

export const bookAppointment = async (
  doctorId: string,
  doctorName: string,
  specialty: string,
  doctorImage: string,
  date: Date,
  time: string,
  type: AppointmentType,
  location: AppointmentLocation,
  symptoms?: string[],
  notes?: string,
  fee?: number
): Promise<Appointment> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    doctorId,
    doctorName,
    specialty,
    doctorImage,
    patientId: 'patient-001',
    patientName: 'John Doe',
    appointmentDate: date,
    appointmentTime: time,
    duration: 30,
    status: 'scheduled',
    type,
    location,
    symptoms,
    notes,
    fee: fee || 1500,
    paid: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  appointments.push(newAppointment);
  saveAppointments();

  return newAppointment;
};

export const getAppointments = (filter?: AppointmentFilter): Appointment[] => {
  let filtered = [...appointments];

  if (filter) {
    if (filter.status && filter.status.length > 0) {
      filtered = filtered.filter(apt => filter.status!.includes(apt.status));
    }

    if (filter.doctorId) {
      filtered = filtered.filter(apt => apt.doctorId === filter.doctorId);
    }

    if (filter.type && filter.type.length > 0) {
      filtered = filtered.filter(apt => filter.type!.includes(apt.type));
    }

    if (filter.dateRange) {
      filtered = filtered.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate >= filter.dateRange!.start && aptDate <= filter.dateRange!.end;
      });
    }
  }

  return filtered.sort((a, b) => 
    new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
  );
};

export const getUpcomingAppointments = (): Appointment[] => {
  const now = new Date();
  return appointments
    .filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      return (apt.status === 'scheduled' || apt.status === 'rescheduled') && aptDate >= now;
    })
    .sort((a, b) => 
      new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
    );
};

export const getPastAppointments = (): Appointment[] => {
  const now = new Date();
  return appointments
    .filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      return apt.status === 'completed' || (aptDate < now && apt.status !== 'scheduled');
    })
    .sort((a, b) => 
      new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
    );
};

export const getAppointmentById = (id: string): Appointment | undefined => {
  return appointments.find(apt => apt.id === id);
};

export const cancelAppointment = (appointmentId: string): void => {
  const index = appointments.findIndex(apt => apt.id === appointmentId);
  if (index !== -1) {
    appointments[index] = {
      ...appointments[index],
      status: 'cancelled',
      updatedAt: new Date(),
    };
    saveAppointments();
  }
};

export const rescheduleAppointment = (
  appointmentId: string,
  newDate: Date,
  newTime: string
): Appointment | null => {
  const index = appointments.findIndex(apt => apt.id === appointmentId);
  if (index !== -1) {
    appointments[index] = {
      ...appointments[index],
      appointmentDate: newDate,
      appointmentTime: newTime,
      status: 'rescheduled',
      updatedAt: new Date(),
    };
    saveAppointments();
    return appointments[index];
  }
  return null;
};

export const refreshAppointments = (): void => {
  appointments = getStoredAppointments();
};
