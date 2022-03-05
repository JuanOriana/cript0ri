import { Flex, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC<{}> = () => {
  const chickenImage = `/images/chicken${useColorModeValue("", "-dark")}.png`;
  // @ts-ignore
  return (
    <Flex
      justifyContent="center"
      opacity={0.4}
      fontSize="sm"
      mt="10"
      as="footer"
    >
      &copy; {new Date().getFullYear()} juan pablo oriana. all rights reserved.
      <a
        href="https://juanoriana-eta.vercel.app"
        rel="noreferrer"
        target="_blank"
      >
        <Image
          src={chickenImage}
          width={5}
          height={5}
          alt="Juan Oriana"
          ml={[2, 0]}
          _hover={{ transform: "rotate(20deg)" }}
        />
      </a>
    </Flex>
  );
};

export default Footer;
