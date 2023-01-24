import dayjs from "dayjs";
import { Article } from "~/libs/denodb.ts";
import { html, tokens } from "rusty_markdown";
import { colors } from "~/styles/variables.ts";
import { styled } from "~/libs/resin/index.ts";
import { Flex } from "~/components/layouts/index.ts";
import { PageProps, Handlers } from "$fresh/server.ts";
import { postStyles } from "../../styles/post.ts";

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

    return ctx.render({
      ...article,
      content: html(tokens(String(article.content))),
    });
  },
};

const BackButton = styled.a({
  color: colors.foreground,
});

const PostArea = styled.div({
  marginTop: 20,
  color: colors.foreground,
  backgroundColor: colors.acceents[1],
  border: `1px solid rgba(255, 255, 255, 0.12)`,
  borderRadius: 8,
  paddingInline: 30,
  paddingBlock: 40,
  transition: "border-color 0.3s",
});

const PostTitle = styled.h1({
  fontWeight: 700,
  fontSize: 50,
  textAlign: "center",
});

const PostMeta = styled(Flex)({
  justifyContent: "center",
  columnGap: 20,
  marginTop: 20,
  color: colors.acceents[6],
});

const PostBody = styled.div({
  marginTop: 40,
  paddingLeft: 50,
  paddingRight: 50,
  ...postStyles,
});

export default function Post({ data }: PageProps<ArticleType>) {
  return (
    <>
      <BackButton href="/">← Back to post list</BackButton>
      <PostArea>
        <PostTitle>{data.title}</PostTitle>
        <PostMeta>
          <time dateTime={data.created_at}>
            Created at : {dayjs(data.created_at).format("YYYY/MM/DD")}
          </time>
          {data.updated_at && (
            <time dateTime={data.updated_at}>
              Updated at {dayjs(data.updated_at).format("YYYY/MM/DD")}
            </time>
          )}
        </PostMeta>
        <PostBody
          class="article"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </PostArea>
    </>
  );
}
