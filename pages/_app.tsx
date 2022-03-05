import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../components/layouts/MainLayout";
import theme from "../constants/theme";
import { ChakraProvider } from "@chakra-ui/react";
import Fonts from "../components/Fonts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
