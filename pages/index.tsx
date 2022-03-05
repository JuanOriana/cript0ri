import React, { useState } from "react";
import type { NextPage } from "next";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Select,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [algorithm, setAlgorithm] = useState("shift");
  const [cod, setCod] = useState("encode");

  return (
    <Center>
      <Box borderRadius="lg" p={3} my={10} textAlign="center">
        <Heading size={"4xl"} mb={20}>
          cript0ri.
        </Heading>
        <form>
          <VStack direction="row" spacing={4}>
            <Text>select the algorithm</Text>
            <Select
              w={40}
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="shift">shift</option>
            </Select>
            <Text>encode or decode?</Text>
            <Select w={40} value={cod} onChange={(e) => setCod(e.target.value)}>
              <option value="encode">encode</option>
              <option value="decode">decode</option>
            </Select>
          </VStack>
        </form>
        <Button
          colorScheme={"teal"}
          mt={8}
          onClick={() => router.push(`/algos/${algorithm}/${cod}`)}
        >
          go!
        </Button>
      </Box>
    </Center>
  );
};

export default Home;
