export interface Prescription {
  id: string;
  appointmentId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedDate: Date;
  refills: number;
  remainingRefills: number;
  doctor: string;
  status: 'active' | 'completed' | 'cancelled';
}
