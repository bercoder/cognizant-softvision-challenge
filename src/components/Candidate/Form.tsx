import React, { useRef } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react'

import { Candidate } from '../../types/candidate'

type Props = {
  close: () => void
  edit: null | Candidate
  save: (value: { id: string; name: string; comments: string; step: string }) => void
  open: boolean
}

export const Form: React.FC<Props> = ({ edit, save, open, close }) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const commentsRef = useRef<HTMLTextAreaElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editing, setEditing] = React.useState<boolean>(false)

  const vacio = (t: string | undefined) => !t || t.trim().length < 1

  const handleSave = () => {
    if (!vacio(nameRef?.current?.value)) {
      save({
        id: edit?.id ?? '',
        name: nameRef?.current?.value ?? '',
        comments: commentsRef?.current?.value ?? '',
        step: edit?.step ?? '',
      })
      close()
    } else nameRef.current?.focus()
  }

  React.useEffect(() => {
    setEditing(edit?.name !== null)
  }, [edit])

  React.useEffect(() => {
    if (open) onOpen()
    else onClose()
  }, [open])

  return (
    <Modal initialFocusRef={nameRef} isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editing ? `Editando ${edit?.name}` : 'Agregar candidato'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <Input
              ref={nameRef}
              required
              defaultValue={edit?.name}
              id="nombre"
              placeholder="Nombre del candidato"
            />
            <FormErrorMessage>Infra</FormErrorMessage>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Comentarios</FormLabel>
            <Textarea
              ref={commentsRef}
              defaultValue={edit?.comments}
              placeholder="Comentarios sobre el candidato"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="twitter" mr={1} variant="outline" onClick={close}>
            Cancelar
          </Button>
          <Button colorScheme="twitter" mr={3} onClick={handleSave}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
