import { useState } from "preact/hooks";
import { colors } from "~/styles/variables.ts";
import { styled } from "~/libs/resin/index.ts";
import { JSX } from "preact/jsx-runtime";
import { html, tokens } from "rusty_markdown";
import { postStyles } from "../styles/post.ts";

interface Props {
  value?: string;
}

const Label = styled.label({ display: "blcok" });
const LabelText = styled.p({ fontSize: 20, fontWeight: 500, marginBottom: 10 });
const PreviewBody = styled.div({
  borderRadius: 4,
  padding: 8,
  fontSize: 18,
  outline: "none",
  transition: "border-color 0.1s",
  minHeight: 500,
  overflowY: "scroll",
  ...postStyles,
});
const TextArea = styled.textarea({
  backgroundColor: colors.background,
  border: `1px solid ${colors.acceents[2]}`,
  display: "block",
  width: "100%",
  borderRadius: 4,
  padding: 8,
  fontSize: 16,
  outline: "none",
  transition: "border-color 0.1s",
  color: colors.foreground,
  resize: "vertical",
  ":focus": {
    borderColor: colors.foreground,
  },
  minHeight: 500,
});
const PreviewSwitcher = styled.label({
  display: "flex",
  alignItems: "center",
  marginTop: 10,
  userSelect: "none",
});

export default function Editor({ value }: Props) {
  const [preview, setPreview] = useState(false);
  const [content, setContent] = useState(value || "");

  const handleChange = (e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    if (e.target instanceof HTMLTextAreaElement) {
      setContent(e.target.value);
    }
  };

  return (
    <>
      <Label>
        <LabelText>Content</LabelText>
        {preview ? (
          <PreviewBody
            class="article"
            dangerouslySetInnerHTML={{ __html: html(tokens(content)) }}
          />
        ) : (
          <TextArea name="content" value={content} onChange={handleChange} />
        )}

        <PreviewSwitcher>
          <input
            type="checkbox"
            checked={preview}
            onChange={() => setPreview(!preview)}
          />
          Preview
        </PreviewSwitcher>
      </Label>
    </>
  );
}
