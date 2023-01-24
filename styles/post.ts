import { CSSObject } from "../libs/resin/types/index.ts";
import { colors } from "./variables.ts";

export const postStyles: CSSObject = {
  "& > *:not(:first-child, h1, hr)": {
    marginTop: 20,
  },
  h1: {
    fontWeight: 600,
    fontSize: 26,
    "&:not(:first-child)": {
      marginTop: 75,
    },
  },
  h2: {
    fontWeight: 600,
    fontSize: 20,
    "&:not(:first-child)": {
      marginTtop: 50,
    },
  },
  "p > img": {
    display: "inline-block",
    marginBlock: "auto",
    width: "100%",

    "& + br": {
      display: "none",
    },
    "& ~ em": {
      display: "block",
      marginTop: 2,
      color: colors.acceents[6],
      textAlign: "center",
    },
  },
  "*:is(ol, ul)": {
    paddingLeft: 30,
  },
  "*:is(h1, h2, p, li)": {
    lineHeight: 1.5,
  },
  table: {
    borderSpacing: 0,

    "th, td": {
      padding: 15,
      textAlign: "left",
    },
    thead: {
      tr: {
        backgroundColor: `${colors.acceents[1]}`,
        border: `1px solid rgba(255, 255, 255, 0.12)`,

        th: {
          /* min-width: 200px; */

          color: colors.foreground[6],
          fontWeight: "normal",
          borderColor: "rgba(255, 255, 255, 0.12)",
          borderStyle: "solid",
          borderWidth: "1px 0",

          "&:first-of-type": {
            borderWidth: "1px 0 1px",
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
          "&:last-of-type": {
            borderWidth: "1px 1px 1px 0",
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          },
        },
      },
    },
    tbody: {
      "td, tr": {
        borderBottom: `1px solid ${colors.acceents[3]}`,
      },
    },
  },
  blockquote: {
    paddingBlock: 10,
    paddingLeft: 15,
    position: "relative",
    color: colors.acceents[6],

    "p:not(:first-of-type)": {
      marginTop: "calc(16px * 1.5)",
    },
    "::before": {
      width: 4,
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      content: "''",
      backgroundColor: colors.acceents[4],
      borderRadius: 12,
    },
  },
  hr: {
    marginTop: 50,
    marginBottom: 0,
    borderColor: colors.acceents[4],
  },
  details: {
    "summary,[class='details-content']": {
      padding: 15,
    },
    summary: {
      userSelect: "none",
      color: colors.acceents[6],
      fontSize: 14,
      backgroundColor: colors.acceents[2],
      border: `1px solid rgba(255, 255, 255, 0.12)`,
      borderRadius: 4,
      cursor: "pointer",
    },
    "[class='details-content']": {
      borderColor: "rgba(255, 255, 255, 0.12)",
      borderStyle: "solid",
      borderWidth: "0px 1px 1px",
      borderBottomRadius: 4,
    },
    "&[open] summary": {
      borderTopRadius: 4,
      borderBottomRadius: "initial",
    },
  },
  pre: {
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 8,
    code: {
      fontWeight: 500,
      fontFamily: "monospace",
    },
  },
  a: {
    color: colors.foreground,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
};
