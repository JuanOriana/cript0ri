import React from "react";
import { Heading, Link } from "@chakra-ui/react";

interface OwnProps {
  name: string;
  coding: string;
}

type Props = OwnProps;

const SectionTitle: React.FC<Props> = ({ name, coding }) => {
  return (
    <>
      <Link href={"/"} ml={-3}>
        &lt;go back
      </Link>
      <Heading mb={8}>
        {name}-&gt;{coding}
      </Heading>
    </>
  );
};

export default SectionTitle;
