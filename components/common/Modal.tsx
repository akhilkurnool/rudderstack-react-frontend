import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: any;
  primaryButton: { label: string; onClick: () => void; disabled: boolean }
  onDelete: () => void;
}

export function ModalContainer(props: ModalProps) {
  const { isOpen, onClose, title, children, primaryButton, onDelete } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={primaryButton.onClick} isDisabled={primaryButton.disabled}>
            {primaryButton.label}
          </Button>
          <Button variant='ghost' onClick={onClose}>Close</Button>
          <Button color="maroon" variant="ghost" onClick={onDelete}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}