import React, { useState } from "react";
import { NextPage } from "next";
import SectionTitle from "../../../../components/SectionTitle";
import {
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { shifter_decode } from "../../../../utils/algos";
const ShiftDecode: NextPage = () => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(0);
  const [decodedText, setDecodedText] = useState("");
  return (
    <>
      <SectionTitle name="shift" coding="encode" />
      <FormControl>
        <VStack alignItems="start" spacing={4}>
          <FormLabel mb={-2}>shift amount:</FormLabel>
          <NumberInput
            defaultValue={0}
            min={0}
            max={26}
            maxW={100}
            size="lg"
            value={shift}
            onChange={(e) => setShift(parseInt(e))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel mb={-2}>text to encode:</FormLabel>
          <Textarea
            placeholder=""
            variant="filled"
            size="lg"
            resize="none"
            height={140}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Flex alignItems="end" justifyContent="end" w="100%">
            <Button
              colorScheme={"teal"}
              px={10}
              py={2}
              onClick={() => setDecodedText(shifter_decode(text, shift))}
            >
              encode
            </Button>
          </Flex>
          {decodedText.length > 0 && (
            <>
              <Divider pt={4} />
              <Text>encoded text:</Text>
              <Container variant="result">{decodedText}</Container>
            </>
          )}
        </VStack>
      </FormControl>
    </>
  );
};

export default ShiftDecode;
