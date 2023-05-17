import type { ModalProps } from 'react-native';

export interface DialogueConfirmProps extends ModalProps {
  title?: string;
  children?: React.ReactNode;
  modalType?: 'SUCCESS' | 'ERROR' | 'WARNING';
  // Confirm
  confirmLabel?: string;
  confirmOnPress?: () => void;
  confirmDisable?: boolean;
  // Close
  closeLabel?: string;
  closeOnPress?: () => void;
  closeDisable?: boolean;
}
