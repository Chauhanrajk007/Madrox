import { MedicalRecord, LabTest } from '@/types/medicalRecords';
import { mockMedicalRecords, mockLabTests } from '@/data/medicalRecords';
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/localStorageHelpers';

const STORAGE_KEY = 'medical_records';
const LAB_TESTS_KEY = 'lab_tests';

const getStoredRecords = (): MedicalRecord[] => {
  const stored = loadFromLocalStorage<MedicalRecord[]>(STORAGE_KEY, []);
  return stored.length > 0 ? stored : mockMedicalRecords;
};

const getStoredLabTests = (): LabTest[] => {
  const stored = loadFromLocalStorage<LabTest[]>(LAB_TESTS_KEY, []);
  return stored.length > 0 ? stored : mockLabTests;
};

const medicalRecords: MedicalRecord[] = getStoredRecords();
const labTests: LabTest[] = getStoredLabTests();

export const getMedicalRecordByAppointment = (appointmentId: string): MedicalRecord | undefined => {
  return medicalRecords.find(record => record.appointmentId === appointmentId);
};

export const getAllMedicalRecords = (): MedicalRecord[] => {
  return medicalRecords.sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );
};

export const getLabTestById = (testId: string): LabTest | undefined => {
  return labTests.find(test => test.id === testId);
};

export const getLabTestsByIds = (testIds: string[]): LabTest[] => {
  return labTests.filter(test => testIds.includes(test.id));
};

export const getPendingLabTests = (): LabTest[] => {
  return labTests.filter(test => test.status === 'pending');
};

export const getCompletedLabTests = (): LabTest[] => {
  return labTests.filter(test => test.status === 'completed');
};

export const downloadMedicalRecord = (recordId: string): Blob => {
  const record = medicalRecords.find(r => r.id === recordId);
  if (!record) {
    throw new Error('Medical record not found');
  }

  const content = `
Medical Record
-------------
Visit Date: ${record.visitDate.toLocaleDateString()}
Doctor: ${record.doctor}
Specialty: ${record.specialty}
Chief Complaint: ${record.chiefComplaint}
Diagnosis: ${record.diagnosis}
Notes: ${record.notes}

Vital Signs:
- Blood Pressure: ${record.vitalSigns.bloodPressure}
- Heart Rate: ${record.vitalSigns.heartRate} bpm
- Temperature: ${record.vitalSigns.temperature}°F
- Weight: ${record.vitalSigns.weight} kg
- Height: ${record.vitalSigns.height} cm
- BMI: ${record.vitalSigns.bmi}
  `;

  return new Blob([content], { type: 'application/pdf' });
};
