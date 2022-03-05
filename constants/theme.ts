import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode("#f0e7db", "#202023")(props),
    },
  }),
};

const components = {
  Heading: {
    variants: {
      "section-title": {
        textDecoration: "underline",
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: "#525252",
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
      },
    },
  },
  Link: {
    baseStyle: (props: any) => ({
      color: mode("#3d7aed", "#ff63c3")(props),
      textUnderlineOffset: 3,
    }),
  },
  Container: {
    variants: {
      result: {
        width: "100%",
        background: "#2D2D30",
        borderRadius: "7px",
        px: 4,
        py: 3,
        fontSize: "lg",
        maxWidth: "100%",
        whiteSpace: "pre-line",
      },
    },
  },
  Textarea: {
    baseStyle: () => ({
      backgroundColor: "#2D2D30",
    }),
  },
};

const fonts = {
  heading: "'Roboto Mono'",
  body: "'Roboto Mono'",
};

const colors = {
  grassTeal: "#88ccca",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({ config, styles, components, fonts, colors });
export default theme;
