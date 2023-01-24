import "~/global.d.ts";

import { Head } from "$fresh/runtime.ts";
import { globalCss } from "~/styles/global.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import { ResinCssEmitter, ResinCssGlobalStyle } from "resin";

const App = ({ Component }: AppProps) => (
  <html>
    <Head>
      <title>Fresh Blog</title>
      <link
        href="https://api.fontshare.com/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
        rel="stylesheet"
      />
      <ResinCssEmitter />
      <ResinCssGlobalStyle css={globalCss} />
    </Head>
    <body>
      <main>
        <Component />
      </main>
    </body>
  </html>
);

export default App;
