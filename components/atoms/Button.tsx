import { ComponentType } from "https://esm.sh/v102/preact@10.11.0/src/index";
import { InferProps, styled } from "~/libs/resin/index.ts";
import { colors } from "~/styles/variables.ts";

interface Anchor {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: "noopener" | "noreferrer";
}

interface Props {
  bordered?: boolean;
  anchor?: Anchor;
}

const StyledButton = styled.button<Props>(({ bordered, anchor }) => ({
  ...{
    borderRadius: 4,
    paddingInline: 12,
    paddingBlock: 8,
    display: "inline-block",
    cursor: "pointer",
    transition: "border-color 0.3s",
    a: anchor
      ? {
          textDecoration: "none",
          color: bordered ? colors.foreground : colors.background,
        }
      : undefined,
  },
  ...(bordered
    ? {
        transition: "border-color 0.3s",
        border: `1px solid ${colors.acceents[4]}`,
        backgroundColor: colors.background,
        ":hover": { borderColor: colors.foreground },
      }
    : {
        transition: anchor
          ? "background-color 0.3s"
          : "color 0.3s, background-color 0.3s",
        border: `1px solid ${colors.foreground}`,
        backgroundColor: colors.foreground,
        ":hover": {
          backgroundColor: colors.background,
          color: anchor ? undefined : colors.foreground,
          a: anchor ? { color: colors.foreground } : undefined,
        },
      }),
}));

export const Button: ComponentType<InferProps<typeof StyledButton>> = ({
  anchor,
  children,
  ...rest
}) => {
  if (anchor) {
    children = (
      <a href={anchor.href} target={anchor.target} rel={anchor.rel}>
        {children}
      </a>
    );
  }

  return (
    <StyledButton {...rest} anchor={anchor}>
      {children}
    </StyledButton>
  );
};
