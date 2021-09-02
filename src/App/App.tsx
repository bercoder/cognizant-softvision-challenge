import React, { useState, useEffect } from 'react'
import { ChakraProvider, Grid } from '@chakra-ui/react'

import { Layout } from '../components/Layout'
import { Step } from '../components/Step'
import { Candidate, Steps } from '../types/candidate'
import Api from '../api'

import theme from './theme'

const steps: Steps[] = [
  'Entrevista inicial',
  'Entrevista técnica',
  'Oferta',
  'Asignación',
  'Rechazo',
]

export default function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([])

  useEffect(() => {
    const local = localStorage.getItem('candidates')

    if (local) {
      setCandidates(JSON.parse(local))
    } else {
      Api.candidates.list().then((res) => setCandidates(res))
    }
  }, [])

  useEffect(() => {
    if (candidates.length > 0) {
      localStorage.setItem('candidates', JSON.stringify(candidates))
    }
  }, [candidates])

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Grid gap={5} gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))">
          {steps.map((step, index) => (
            <Step
              key={index}
              actualStep={step}
              allCandidates={candidates}
              steps={steps}
              updateCandidates={(value) => setCandidates(value)}
            />
          ))}
        </Grid>
      </Layout>
    </ChakraProvider>
  )
}
