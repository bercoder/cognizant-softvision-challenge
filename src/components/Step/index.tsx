import React, { useState, useEffect } from 'react'
import { Text, Flex, Heading, Button } from '@chakra-ui/react'

import { Candidate } from '../Candidate'
import { Form } from '../Candidate/Form'
import { Candidate as iCandidate, Steps } from '../../types/candidate'

type Props = {
  actualStep: Steps
  steps: Steps[]
  allCandidates: iCandidate[]
  updateCandidates: (value: iCandidate[]) => void
}

export const Step: React.FC<Props> = ({ actualStep, steps, allCandidates, updateCandidates }) => {
  const [candidates, setCandidates] = useState<iCandidate[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [edit, setEdit] = useState<null | iCandidate>(null)

  const Fetch = () => {
    setLoading(true)
    const all = allCandidates.filter((candidate) => candidate.step === actualStep)

    setTotal(all.length ?? 0)
    setCandidates(all)
    setLoading(false)
  }

  useEffect(() => {
    Fetch()
  }, [allCandidates])

  const openModal = () => {
    setModal(true)
  }

  const update = (id: string, step: any) => {
    const newList = [...allCandidates]
    const index = allCandidates.findIndex((c) => c.id === id)

    newList[index].step = step
    updateCandidates([...newList])
  }

  const setFormSave = ({
    id,
    name,
    comments,
    step,
  }: {
    id: string
    name: string
    comments: string
    step: string
  }) => {
    if (!id || id === '') {
      const newId = allCandidates.length + 1

      const newData: iCandidate = {
        id: newId.toString(),
        name,
        comments,
        step: actualStep,
      }

      updateCandidates([...allCandidates, newData])
    } else {
      const newList = [...allCandidates]
      const index = allCandidates.findIndex((c) => c.id === id)

      newList[index].name = name
      newList[index].comments = comments
      updateCandidates([...newList])
      setEdit(null)
    }
  }

  const searchIndex = (index: string) => steps.findIndex((st) => st === index)

  const canBackward = (index: number) => {
    return index > 0
  }

  const canForward = (index: number) => {
    return index > -1 && index < steps.length - 1
  }

  const forward = (id: string, index: number) => {
    if (canForward(index)) {
      update(id, steps[index + 1])
    }
  }

  const backward = (id: string, index: number) => {
    if (canBackward(index)) {
      update(id, steps[index - 1])
    }
  }

  return (
    <>
      <Flex
        bgGradient="linear(to-l, gray.100, white)"
        borderRadius="md"
        boxShadow="md"
        color="gray.600"
        flexDirection="column"
        p={2}
      >
        <Heading flexShrink={0} mb={3} msize="lg">
          {actualStep}
          <Text as="i" display="block" fontSize="xs" fontWeight="normal">
            (
            {total === 1
              ? `${total} candidato`
              : total < 1
              ? 'sin candidatos'
              : `${total} candidatos`}
            )
          </Text>
        </Heading>
        {total ? (
          candidates.map((candidate) => (
            <Candidate
              key={candidate.id}
              {...candidate}
              backward={backward}
              canBackward={canBackward}
              canForward={canForward}
              edit={(value) => {
                setEdit(value)
                setModal(true)
              }}
              forward={forward}
              searchIndex={searchIndex}
            />
          ))
        ) : (
          <Text as="i" flexGrow={1} m={3}>
            No hay candidatos
          </Text>
        )}
        <Button colorScheme="twitter" flexShrink={0} mt={2} width="100%" onClick={openModal}>
          + Agregar candidato
        </Button>
      </Flex>
      <Form
        close={() => {
          setModal(false)
          setEdit(null)
        }}
        edit={edit}
        open={modal}
        save={(value) => setFormSave(value)}
      />
    </>
  )
}
