import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        height: '100%',
      },
      body: {
        backgroundColor: '#2193b0',
        background: 'linear-gradient(to left, #00d2ff, #3a7bd5)',
        color: '#222222',
        fontFamily: 'Montserrat, sans-serif',
      },
    },
  },
})

export default theme
