import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'

import { Candidate as iCandidate } from '../../types/candidate'

type funcs = {
  searchIndex: (i: string) => number
  canBackward: (i: number) => boolean
  canForward: (i: number) => boolean
  backward: (id: string, i: number) => void
  forward: (id: string, i: number) => void
  edit: (value: iCandidate) => void
}

type Props = iCandidate & funcs

export const Candidate: React.FC<Props> = ({
  id,
  name,
  step,
  comments,
  searchIndex,
  canBackward,
  canForward,
  backward,
  forward,
  edit,
}) => {
  const index = searchIndex(step)
  const canB = !canBackward(index)
  const canF = !canForward(index)

  return (
    <Flex key={id} alignItems="flex-start" flexGrow={1} justifyContent="space-between" width="100%">
      <Flex bg="gray.300" borderRadius="md" my={1} p={2} width="100%">
        <Box flex="1">
          <Heading as="h3" size="md">
            {name}{' '}
            <Button
              _hover={{ textDecoration: 'none', color: 'steelblue' }}
              p={0}
              size="md"
              title={`Edit ${name}`}
              variant="link"
              onClick={() =>
                edit({
                  id,
                  name,
                  step,
                  comments,
                })
              }
            >
              🖉
            </Button>
          </Heading>
          <Text>{comments}</Text>
        </Box>
        <Flex>
          <Button disabled={canB} onClick={() => backward(id, index)}>
            ←
          </Button>
          <Button disabled={canF} onClick={() => forward(id, index)}>
            →
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
