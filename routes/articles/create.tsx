import Editor from "~/islands/Editor.tsx";
import { Article } from "~/libs/denodb.ts";
import { colors } from "~/styles/variables.ts";
import { styled } from "~/libs/resin/index.ts";
import { Flex } from "~/components/layouts/index.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../../components/atoms/Button.tsx";

interface Data {
  error: {
    title?: boolean;
    content?: boolean;
    msg?: string;
  };
  title: string;
  content: string;
}

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    let title = "",
      content = "";
    try {
      const formData = await req.formData();

      title = formData.get("title")?.toString() || "";
      content = formData.get("content")?.toString() || "";

      if (!title || !content) {
        return ctx.render({
          error: { title: !title, content: !content },
          title,
          content,
        });
      }
      await Article.create({ title, content });
      return new Response("", { status: 303, headers: { Location: "/" } });
    } catch {
      return ctx.render({
        error: { msg: "送信に失敗しました。" },
        title,
        content,
      });
    }
  },
};

const PageTitle = styled.h2({
  fontWeight: 600,
  fontSize: 30,
});

const CreatePostArea = styled.div({
  marginTop: 20,
  color: colors.foreground,
  backgroundColor: colors.acceents[1],
  border: `1px solid rgba(255, 255, 255, 0.12)`,
  borderRadius: 8,
  paddingInline: 25,
  paddingBlock: 50,
  transition: "border-color 0.3s",
});

const CreatePostForm = styled.form({
  paddingInline: 80,
  display: "grid",
  rowGap: 30,
});

const Label = styled.label({ display: "block" });

const LabelText = styled.p({
  marginBottom: 10,
  fontSize: 20,
  fontWeight: 500,
});

const Input = styled.input({
  backgroundColor: colors.background,
  border: `1px solid ${colors.acceents[2]}`,
  display: "block",
  width: "100%",
  borderRadius: 4,
  padding: 8,
  fontSize: 18,
  outline: "none",
  transition: "border-color 0.1s",
  color: colors.foreground,
  ":focus": {
    borderColor: colors.foreground,
  },
});

const ActionsWrapper = styled(Flex)({
  justifyContent: "flex-end",
  columnGap: 20,
});

const Create = ({ data }: PageProps<Data | undefined>) => {
  return (
    <>
      <PageTitle>Create new post</PageTitle>
      <CreatePostArea>
        <CreatePostForm method="post">
          <Label>
            <LabelText>Title</LabelText>
            <Input name="title" type="text" value={data?.title} />
            {data?.error?.title && <p>必須な項目です。</p>}
          </Label>
          <Editor value={data?.content} />
          {data?.error?.msg && <p>{data.error.msg}</p>}
          <ActionsWrapper>
            <Button bordered anchor={{ href: "/" }} type="button">
              Back
            </Button>
            <Button type="submit">Add new</Button>
          </ActionsWrapper>
        </CreatePostForm>
      </CreatePostArea>
    </>
  );
};

export default Create;
