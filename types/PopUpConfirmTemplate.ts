// types/confirmationTemplates.ts

import { ConfirmationType } from "@/utils/enum";



export interface ConfirmationTemplate {
  title: string;
  message: string;
  onConfirm: string;
  onClose: string;
}

export const ConfirmationTemplates: Record<ConfirmationType, ConfirmationTemplate> = {
  DELETE: {
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this note?',
    onConfirm: 'Delete',
    onClose: 'Cancel',
  },
  UPDATE: {
    title: 'Confirm Update',
    message: 'Are you sure you want to update this note?',
    onConfirm: 'Update',
    onClose: 'Cancel',
  },
  REMOVE: {
    title: 'Confirm Remove',
    message: 'Are you sure you want to remove this note?',
    onConfirm: 'Remove',
    onClose: 'Cancel',
  },
  CREATE: {
    title: 'Confirm Create',
    message: 'Are you sure you want to create this note?',
    onConfirm: 'Create',
    onClose: 'Cancel',
  },
};
