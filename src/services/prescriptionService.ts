import { Prescription } from '@/types/prescriptions';
import { mockPrescriptions } from '@/data/prescriptions';
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/localStorageHelpers';

const STORAGE_KEY = 'prescriptions';

const getStoredPrescriptions = (): Prescription[] => {
  const stored = loadFromLocalStorage<Prescription[]>(STORAGE_KEY, []);
  return stored.length > 0 ? stored : mockPrescriptions;
};

let prescriptions: Prescription[] = getStoredPrescriptions();

export const getActivePrescriptions = (): Prescription[] => {
  return prescriptions.filter(p => p.status === 'active')
    .sort((a, b) => new Date(b.prescribedDate).getTime() - new Date(a.prescribedDate).getTime());
};

export const getPrescriptionHistory = (): Prescription[] => {
  return prescriptions.filter(p => p.status === 'completed' || p.status === 'cancelled')
    .sort((a, b) => new Date(b.prescribedDate).getTime() - new Date(a.prescribedDate).getTime());
};

export const getPrescriptionsByAppointment = (appointmentId: string): Prescription[] => {
  return prescriptions.filter(p => p.appointmentId === appointmentId);
};

export const downloadPrescription = (prescriptionId: string): Blob => {
  // Mock PDF generation
  const prescription = prescriptions.find(p => p.id === prescriptionId);
  if (!prescription) {
    throw new Error('Prescription not found');
  }

  const pdfContent = `
Prescription
-----------
Medication: ${prescription.medicationName}
Dosage: ${prescription.dosage}
Frequency: ${prescription.frequency}
Duration: ${prescription.duration}
Instructions: ${prescription.instructions}
Doctor: ${prescription.doctor}
Date: ${prescription.prescribedDate.toLocaleDateString()}
  `;

  return new Blob([pdfContent], { type: 'application/pdf' });
};

export const refillRequest = async (prescriptionId: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = prescriptions.findIndex(p => p.id === prescriptionId);
  if (index !== -1 && prescriptions[index].remainingRefills > 0) {
    prescriptions[index] = {
      ...prescriptions[index],
      remainingRefills: prescriptions[index].remainingRefills - 1,
    };
    saveToLocalStorage(STORAGE_KEY, prescriptions);
    return true;
  }
  return false;
};
