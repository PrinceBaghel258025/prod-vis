import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { ChakraProvider } from '@chakra-ui/react'
import ContentBuilder from "../src/components/top-level/content-builder"
function App() {

  return (
    <>
      <ChakraProvider>
        <ContentBuilder />
      </ChakraProvider>
    </>
  )
}

export default App
