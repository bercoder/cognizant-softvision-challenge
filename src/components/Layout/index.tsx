import React, { FC } from 'react'
import { Box, Container, Heading, Text } from '@chakra-ui/react'

export const Layout: FC = ({ children }) => (
  <Container maxW="container.xl" minH="100vh">
    <Box as="header" borderBottom="1px" mb={5} minH="60px" p="3">
      <Heading as="h1" size="lg">
        Cognizant{' '}
        <Text as="span" fontWeight="normal">
          soft
        </Text>
        vision{' '}
        <Text as="span" fontWeight="normal">
          Challenge
        </Text>
      </Heading>
    </Box>
    <main>{children}</main>
  </Container>
)
