import type { ModalProps } from 'react-native';

export interface DialogueProps extends ModalProps {
  title?: string;
  modalType?: 'SUCCESS' | 'ERROR' | 'WARNING';
  children?: React.ReactNode;
  onClose: () => void;
}
