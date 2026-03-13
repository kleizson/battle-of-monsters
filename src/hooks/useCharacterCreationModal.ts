import { useState } from 'react';

export interface UseCharacterCreationModalResult {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function useCharacterCreationModal(): UseCharacterCreationModalResult {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
}

