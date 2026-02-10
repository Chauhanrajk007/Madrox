export interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  bmi: number;
  oxygenSaturation?: number;
}

export interface LabTest {
  id: string;
  testName: string;
  orderedDate: Date;
  completedDate?: Date;
  result?: string;
  status: 'pending' | 'completed';
  abnormal: boolean;
  document?: string;
}

export interface MedicalDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'report';
  url: string;
  uploadedDate: Date;
  size: number;
}

export interface MedicalRecord {
  id: string;
  appointmentId: string;
  visitDate: Date;
  doctor: string;
  specialty: string;
  chiefComplaint: string;
  diagnosis: string;
  prescriptions: string[]; // IDs of prescriptions
  labTests: string[]; // IDs of lab tests
  vitalSigns: VitalSigns;
  notes: string;
  followUpDate?: Date;
  attachments?: MedicalDocument[];
}
