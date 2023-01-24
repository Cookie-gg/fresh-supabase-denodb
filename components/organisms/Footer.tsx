import { styled } from "../../libs/resin/index.ts";
import { colors } from "../../styles/variables.ts";

const Wrapper = styled.footer({
  paddingInline: 30,
  paddingBlock: 20,
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  alignItems: "center",
  borderTop: `1px solid ${colors.acceents[0]}`,
  small: {
    color: colors.acceents[4],
  },
});

export const Footer = () => {
  return (
    <Wrapper>
      <small>Copyright © Cookie_gg 2020-2022</small>
      <a href="https://fresh.deno.dev" target="_blank" rel="noopener">
        <img
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge-dark.svg"
          alt="Made with Fresh"
        />
      </a>
    </Wrapper>
  );
};
