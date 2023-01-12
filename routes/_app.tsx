import { Head } from "$fresh/runtime.ts";
import { injectGlobal } from "~/styles/global.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
import "~/global.d.ts";

dayjs.extend(relativeTime);
dayjs.locale("ja");

injectGlobal();

const App = ({ Component }: AppProps) => (
  <html>
    <Head>
      <title>Fresh Blog</title>
      <link
        href="https://api.fontshare.com/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <main>
        <Component />
      </main>
    </body>
  </html>
);

export default App;
