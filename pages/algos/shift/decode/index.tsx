import React, { useState } from "react";
import { NextPage } from "next";
import SectionTitle from "../../../../components/SectionTitle";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  Alert,
  AlertIcon,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { shifter_decode, shifter_decode_auto } from "../../../../utils/algos";
const ShiftDecode: NextPage = () => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(0);
  const [decodedText, setDecodedText] = useState("");
  const [shiftsNeeded, setShiftNeeded] = useState(-1);
  const [calculateAuto, setCalulateAuto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function decode(textToDecode: string) {
    setIsLoading(true);
    setError(false);
    setShiftNeeded(-1);
    if (!calculateAuto) {
      setDecodedText(shifter_decode(textToDecode, shift));
      setIsLoading(false);
      return;
    }
    setDecodedText("");
    const result = await shifter_decode_auto(textToDecode);
    if (result.isDecodable) {
      setDecodedText(result.decodedText!);
      setShiftNeeded(result.shiftsNeeded!);
    } else {
      setError(true);
    }
    setIsLoading(false);
  }
  return (
    <>
      <SectionTitle name="shift" coding="decode" />
      <FormControl>
        <VStack alignItems="start" spacing={4}>
          <FormLabel mb={-2}>shift amount:</FormLabel>
          {!calculateAuto && (
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
          )}
          {calculateAuto && (
            <Text opacity={0.7} colorScheme="cyan">
              I will attempt to guess what the original shift value was, if the
              input text is long enough.
            </Text>
          )}
          <Checkbox
            colorScheme="teal"
            isChecked={calculateAuto}
            onChange={(e) => setCalulateAuto(e.target.checked)}
          >
            I dont know
          </Checkbox>
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
            <Stack>
              <Tooltip
                label="I need a longer message to auto-decode"
                isDisabled={!calculateAuto || text.length >= 20}
              >
                <div style={{ display: "inline-block" }}>
                  <Button
                    colorScheme={"teal"}
                    px={10}
                    py={2}
                    onClick={() => decode(text)}
                    isDisabled={calculateAuto && text.length < 20}
                  >
                    decode
                  </Button>
                </div>
              </Tooltip>
            </Stack>
          </Flex>
          {isLoading && <Spinner />}
          {decodedText.length > 0 && !isLoading && (
            <>
              <Divider pt={4} />
              <Text>encoded text:</Text>
              <Container variant="result">{decodedText}</Container>
              {shiftsNeeded >= 0 && (
                <Text>
                  shifts needed:
                  <span style={{ color: "cyan", fontWeight: 700 }}>
                    {shiftsNeeded}
                  </span>
                </Text>
              )}
            </>
          )}
        </VStack>
        {error && (
          <Alert status="error" mt={8} rounded={8}>
            <AlertIcon />
            Couldn&apos;t decode the message :(
          </Alert>
        )}
      </FormControl>
    </>
  );
};

export default ShiftDecode;
