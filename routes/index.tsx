import dayjs from "dayjs";
import { css } from "~/libs/emotion.ts";
import { colors } from "~/styles/variables.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Article } from "~/libs/denodb.ts";

interface ArticleType {
  id: string;
  title: string;
  created_at: string;
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const articles = await Article.all();
    return ctx.render(articles);
  },
};

export default function Home({ data }: PageProps<ArticleType[]>) {
  return (
    <>
      <h1 class={css({ fontWeight: 700, fontSize: 60, marginBottom: 40 })}>
        Fresh Blog
      </h1>
      <section>
        <div
          class={css({
            display: "flex",
            marginBottom: 20,
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <h2 class={css({ fontWeight: 600, fontSize: 30 })}>Latest Posts</h2>
          <button
            class={css({
              backgroundColor: colors.foreground,
              borderRadius: 4,
              fontSize: 16,
              cursor: "pointer",
              transition: "background-color 0.3s, border-color 0.3s",
              boxSizing: "border-box",
              border: `1px solid transparent`,
              ":hover": {
                backgroundColor: colors.background,
                borderColor: colors.foreground,
                a: {
                  color: colors.foreground,
                },
              },
            })}
          >
            <a
              href="/articles/create"
              class={css({
                textDecoration: "none",
                color: colors.background,
                transition: "color 0.3s",
                paddingInline: 12,
                display: "block",
                paddingBlock: 8,
              })}
            >
              Add new
            </a>
          </button>
        </div>
        <ul
          class={css({
            display: "grid",
            rowGap: 20,
          })}
        >
          {data.map((article) => (
            <li
              key={article.id}
              class={css({
                color: colors.foreground,
                backgroundColor: colors.acceents[1],
                border: `1px solid rgba(255, 255, 255, 0.12)`,
                borderRadius: 8,

                transition: "border-color 0.3s",
                ":hover": {
                  borderColor: colors.foreground,
                },
              })}
            >
              <a
                href={`articles/${article.id}`}
                class={css({
                  color: colors.foreground,
                  textDecoration: "none",
                  padding: 25,
                  display: "block",
                })}
              >
                <h3
                  class={css({
                    fontSize: 22,
                    fontWeight: 600,
                    marginBottom: 10,
                  })}
                >
                  {article.title}
                </h3>
                <time dateTime={article.created_at}>
                  {dayjs(article.created_at).fromNow()}
                </time>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
