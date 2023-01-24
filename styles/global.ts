import { css } from "~/libs/resin/index.ts";
import { font } from "~/styles/variables.ts";
import { CSSInterpolation } from "~/libs/resin/types/index.ts";

const multipleSelector = (
  selectors: string[],
  styles: CSSInterpolation,
  requireClass?: boolean
) =>
  Object.fromEntries(
    selectors.map<[string, CSSInterpolation]>((tag) => [
      requireClass ? `${tag}[class]` : tag,
      styles,
    ])
  );

export const globalCss = css({
  body: {
    backgroundColor: "black",
    color: "white",
    fontFamily: font.generalSans,
    margin: 0,
  },
  main: {
    maxWidth: 1000,
    margin: "0 auto",
    paddingBlock: 50,
    paddingInline: 30,
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
  ...multipleSelector(
    ["ul", "ol", "li"],
    { padding: 0, margin: 0, listStyle: "none" },
    true
  ),
  ...multipleSelector(["h1", "h2", "h3", "h4", "h5", "h6", "p"], {
    margin: 0,
    fontWeight: "initial",
  }),
});
