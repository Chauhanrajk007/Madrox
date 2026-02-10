import { AppointmentNotification } from '@/types/appointments';
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/localStorageHelpers';

const STORAGE_KEY = 'notifications';

const getStoredNotifications = (): AppointmentNotification[] => {
  return loadFromLocalStorage<AppointmentNotification[]>(STORAGE_KEY, []);
};

let notifications: AppointmentNotification[] = getStoredNotifications();

const saveNotifications = () => {
  saveToLocalStorage(STORAGE_KEY, notifications);
};

export const getNotifications = (): AppointmentNotification[] => {
  return notifications.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const getUnreadNotifications = (): AppointmentNotification[] => {
  return notifications.filter(n => !n.read);
};

export const markAsRead = (notificationId: string): void => {
  const index = notifications.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    notifications[index] = {
      ...notifications[index],
      read: true,
    };
    saveNotifications();
  }
};

export const markAllAsRead = (): void => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  saveNotifications();
};

export const createNotification = (
  type: AppointmentNotification['type'],
  appointmentId: string,
  message: string
): void => {
  const notification: AppointmentNotification = {
    id: `notif-${Date.now()}`,
    type,
    appointmentId,
    message,
    timestamp: new Date(),
    read: false,
  };

  notifications.push(notification);
  saveNotifications();
};

export const deleteNotification = (notificationId: string): void => {
  notifications = notifications.filter(n => n.id !== notificationId);
  saveNotifications();
};
