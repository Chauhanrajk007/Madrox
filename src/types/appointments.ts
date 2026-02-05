export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
export type AppointmentType = 'consultation' | 'follow-up' | 'emergency' | 'checkup';
export type AppointmentLocation = 'in-person' | 'video-call' | 'phone-call';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  doctorImage: string;
  patientId: string;
  patientName: string;
  appointmentDate: Date;
  appointmentTime: string;
  duration: number; // minutes
  status: AppointmentStatus;
  type: AppointmentType;
  location: AppointmentLocation;
  symptoms?: string[];
  notes?: string;
  prescriptions?: string[]; // IDs of prescriptions
  testResults?: string[]; // IDs of test results
  diagnosis?: string;
  fee: number;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentFilter {
  status?: AppointmentStatus[];
  doctorId?: string;
  dateRange?: { start: Date; end: Date };
  type?: AppointmentType[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  duration: number;
  consultationType: AppointmentLocation;
}

export interface AppointmentNotification {
  id: string;
  type: 'reminder' | 'confirmation' | 'cancellation' | 'rescheduled';
  appointmentId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
