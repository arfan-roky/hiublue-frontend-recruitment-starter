import * as React from "react";
import Providers from "./providers";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
