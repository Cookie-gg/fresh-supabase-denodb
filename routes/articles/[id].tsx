import { PageProps, Handlers } from "$fresh/server.ts";
import dayjs from "dayjs";
import { Article } from "~/libs/denodb.ts";
import { css } from "~/libs/emotion.ts";
import { colors } from "~/styles/variables.ts";
import { marked } from "marked";
import sanitize from "sanitize-html";

interface ArticleType {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const article = await Article.find(ctx.params.id);

    const parsed = marked(String(article.content));
    const parsedContent = sanitize(parsed);

    return ctx.render({ ...article, content: parsedContent });
  },
};

export default function Post({ data }: PageProps<ArticleType>) {
  return (
    <>
      <a
        href="/"
        class={css({
          color: colors.foreground,
        })}
      >
        ← Back to post list
      </a>
      <div
        class={css({
          marginTop: 20,
          color: colors.foreground,
          backgroundColor: colors.acceents[1],
          border: `1px solid rgba(255, 255, 255, 0.12)`,
          borderRadius: 8,
          padding: 25,
          transition: "border-color 0.3s",
        })}
      >
        <h1
          class={css({
            fontWeight: 700,
            fontSize: 50,
            textAlign: "center",
          })}
        >
          {data.title}
        </h1>
        <div
          class={css({
            display: "flex",
            justifyContent: "center",
            columnGap: 20,
            marginTop: 20,
            color: colors.acceents[6],
          })}
        >
          <time dateTime={data.created_at}>
            Created at : {dayjs(data.created_at).format("YYYY/MM/DD")}
          </time>
          {data.updated_at && (
            <time dateTime={data.updated_at}>
              Updated at {dayjs(data.updated_at).format("YYYY/MM/DD")}
            </time>
          )}
        </div>
        <div
          class={css({
            marginTop: 40,
            paddingLeft: 50,
            paddingRight: 50,
          })}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </>
  );
}
