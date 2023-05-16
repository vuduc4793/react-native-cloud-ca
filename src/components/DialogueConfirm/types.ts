import type { ModalProps } from 'react-native';

export interface DialogueConfirmProps extends ModalProps {
  title?: string;
  children?: React.ReactNode;
  // Confirm
  confirmLabel?: string;
  confirmOnPress?: () => void;
  confirmDisable?: boolean;
  // Close
  closeLabel?: string;
  closeOnPress?: () => void;
  closeDisable?: boolean;
}
