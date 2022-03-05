import React from "react";
import Footer from "../../Footer";
import { Flex, Container } from "@chakra-ui/react";
import Head from "next/head";

const MainLayout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Flex as="main" pb={8} direction="column" minH="100vh">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="My cryptography examples" />
          <meta name="author" content="Juan Pablo Oriana" />
          <title>cript0ri</title>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="cript0ri" />
          <meta property="og:image" content="/images/chicken.png" />
        </Head>
        <Container maxW="container.md" pt={14} flex={1}>
          {children}
        </Container>
        <Footer />
      </Flex>
    </>
  );
};

export default MainLayout;
