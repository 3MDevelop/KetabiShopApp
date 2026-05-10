// utils/alert.ts
import { Platform, Alert as NativeAlert } from 'react-native';

type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

export const showAlert = (title: string, message: string, buttons: AlertButton[] = []) => {
  if (Platform.OS === 'web') {
    const messageWithTitle = `${title}\n\n${message}`;
    const result = window.confirm(messageWithTitle);
    
    if (result) {
      const confirmButton = buttons.find(btn => btn.style !== 'cancel');
      confirmButton?.onPress?.();
    } else {
      const cancelButton = buttons.find(btn => btn.style === 'cancel');
      cancelButton?.onPress?.();
    }
  } else {
    NativeAlert.alert(title, message, buttons);
  }
};