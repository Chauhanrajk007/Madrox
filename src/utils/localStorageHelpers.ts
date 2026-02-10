const STORAGE_KEY_PREFIX = 'madrox_';

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, serialized);
  } catch (error) {
    console.error(`Error saving to localStorage:`, error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    if (item) {
      return JSON.parse(item, (key, value) => {
        // Auto-parse dates
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
          return new Date(value);
        }
        return value;
      }) as T;
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage:`, error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing from localStorage:`, error);
  }
};

export const clearAllStorage = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error(`Error clearing localStorage:`, error);
  }
};
