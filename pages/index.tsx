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
            <Text>Select the algorithm</Text>
            <Select
              w={40}
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="shift">Shift</option>
            </Select>
            <Text>Encode or decode?</Text>
            <Select w={40} value={cod} onChange={(e) => setCod(e.target.value)}>
              <option value="encode">Encode</option>
              <option value="decode">Decode</option>
            </Select>
          </VStack>
        </form>
        <Button
          colorScheme={"blue"}
          mt={8}
          onClick={() => router.push(`/algos/${algorithm}/${cod}`)}
        >
          Go!
        </Button>
      </Box>
    </Center>
  );
};

export default Home;
