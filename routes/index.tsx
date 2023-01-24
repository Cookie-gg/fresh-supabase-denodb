import { Article } from "~/libs/denodb.ts";
import { colors } from "~/styles/variables.ts";
import { styled } from "~/libs/resin/index.ts";
import { Flex } from "../components/layouts/index.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "~/components/atoms/Button.tsx";
import "dayjs/locale/ja";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ja");

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

const PageTitle = styled.h1({
  fontWeight: 700,
  fontSize: 60,
  marginBottom: 40,
});

const PostListHeader = styled(Flex)({
  marginBottom: 20,
  justifyContent: "space-between",
  alignItems: "center",
});

const SectionTitle = styled.h2({
  fontWeight: 600,
  fontSize: 30,
});

const PostList = styled.ul({
  display: "grid",
  rowGap: 20,
});

const PostCard = styled.li({
  color: colors.foreground,
  backgroundColor: colors.acceents[1],
  border: `1px solid rgba(255, 255, 255, 0.12)`,
  borderRadius: 8,
  transition: "border-color 0.3s",
  ":hover": {
    borderColor: colors.foreground,
  },
});

const PostLink = styled.a({
  color: colors.foreground,
  textDecoration: "none",
  padding: 25,
  display: "block",
});

const PostTitle = styled.h3({
  fontSize: 22,
  fontWeight: 600,
  marginBottom: 10,
});

export default function Home({ data }: PageProps<ArticleType[]>) {
  return (
    <>
      <PageTitle>Fresh Blog</PageTitle>
      <section>
        <PostListHeader>
          <SectionTitle>Latest Posts</SectionTitle>
          <Button anchor={{ href: "/articles/create" }}>Add new</Button>
        </PostListHeader>
        <PostList>
          {data.map((article) => (
            <PostCard key={article.id}>
              <PostLink href={`articles/${article.id}`}>
                <PostTitle>{article.title}</PostTitle>
                <time dateTime={article.created_at}>
                  {dayjs(article.created_at).fromNow()}
                </time>
              </PostLink>
            </PostCard>
          ))}
        </PostList>
      </section>
    </>
  );
}
