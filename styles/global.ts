import { font } from "./variables.ts";
import { CSSInterpolation } from "@emotion/css";
import { injectGlobal as injectGlobalOrigin } from "~/libs/emotion.ts";

const multipleSelector = (selectors: string[], styles: CSSInterpolation) =>
  Object.fromEntries(
    selectors.map<[string, CSSInterpolation]>((tag) => [tag, styles])
  );

export const injectGlobal = () =>
  injectGlobalOrigin({
    body: {
      margin: 0,
      backgroundColor: "black",
      color: "white",
      fontFamily: font.generalSans,
    },
    main: {
      maxWidth: 1000,
      margin: "0 auto",
      paddingTop: 50,
    },
    button: {
      padding: 0,
      appearance: "none",
      backgroundColor: "transparent",
      border: "none",
      outline: 0,
    },
    ...multipleSelector(["*", "*::before", "*::after"], {
      boxSizing: "border-box",
    }),
    ...multipleSelector(
      ["figure", "figcaption", "blockquote", "dl", "dd", "pre"],
      {
        margin: 0,
      }
    ),
    ...multipleSelector(["ul", "ol", "li"], {
      padding: 0,
      margin: 0,
      listStyle: "none",
    }),
    ...multipleSelector(["h1", "h2", "h3", "h4", "h5", "h6", "p"], {
      margin: 0,
      fontWeight: "initial",
    }),
  });
