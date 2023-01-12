import { css } from "~/libs/emotion.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { colors } from "~/styles/variables.ts";
import { Article } from "../../libs/denodb.ts";

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

const Create = ({ data }: PageProps<Data | undefined>) => {
  return (
    <>
      <h2 class={css({ fontWeight: 600, fontSize: 30 })}>Create new post</h2>
      <div
        class={css({
          marginTop: 20,
          color: colors.foreground,
          backgroundColor: colors.acceents[1],
          border: `1px solid rgba(255, 255, 255, 0.12)`,
          borderRadius: 8,
          paddingInline: 25,
          paddingBlock: 50,
          transition: "border-color 0.3s",
        })}
      >
        <form
          class={css({
            paddingInline: 80,
            display: "grid",
            rowGap: 30,
          })}
          method="post"
        >
          <label class={css({ display: "block" })}>
            <p
              class={css({
                marginBottom: 10,
                fontSize: 20,
                fontWeight: 500,
              })}
            >
              Title
            </p>
            <input
              name="title"
              type="text"
              value={data?.title}
              class={css({
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
              })}
            />
            {data?.error?.title && <p>必須な項目です。</p>}
          </label>
          <label class={css({ display: "block" })}>
            <p
              class={css({
                marginBottom: 10,
                fontSize: 20,
                fontWeight: 500,
              })}
            >
              Content
            </p>
            <textarea
              name="content"
              value={data?.content}
              class={css({
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
                resize: "vertical",
                ":focus": {
                  borderColor: colors.foreground,
                },
                minHeight: 500,
              })}
            />
            {data?.error?.content && <p>必須な項目です。</p>}
          </label>
          {data?.error?.msg && <p>{data.error.msg}</p>}
          <div
            class={css({
              display: "flex",
              justifyContent: "flex-end",
              columnGap: 20,
            })}
          >
            <a
              href="/"
              class={css({
                borderRadius: 4,
                paddingInline: 12,
                paddingBlock: 8,
                display: "block",
                fontSize: 16,
                cursor: "pointer",
                transition: "border-color 0.3s",
                boxSizing: "border-box",
                border: `1px solid transparent`,
                backgroundColor: colors.background,
                borderColor: colors.acceents[4],
                color: colors.foreground,
                textDecoration: "none",
                ":hover": {
                  borderColor: colors.foreground,
                },
              })}
            >
              Back
            </a>
            <button
              type="submit"
              class={css({
                backgroundColor: colors.foreground,
                borderRadius: 4,
                paddingInline: 12,
                paddingBlock: 8,
                fontSize: 16,
                cursor: "pointer",
                transition: "all 0.3s",
                boxSizing: "border-box",
                border: `1px solid transparent`,
                ":hover": {
                  backgroundColor: colors.background,
                  borderColor: colors.foreground,
                  color: colors.background,
                },
              })}
            >
              Add new
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
