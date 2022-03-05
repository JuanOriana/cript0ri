import React from "react";
import NextLink from "next/link";
import { Box, Heading, Text, Flex, Divider, Button } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      mt={32}
    >
      <Heading>Not Found</Heading>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Text>The page you're looking for was not found.</Text>

      <Divider my={6} />

      <Box my={6} textAlign="center">
        <NextLink href="/" passHref={}>
          <Button colorScheme="blue">Go back home</Button>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default NotFound;
