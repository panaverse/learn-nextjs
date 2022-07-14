import type { AppProps } from 'next/app';
import { ChakraProvider, Box } from '@chakra-ui/react';
import TopBar from '../components/TopBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <TopBar />
      <Box maxW="container.xl" margin="auto">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;