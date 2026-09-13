import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";
import { DISABLE_TEXT_SELECTION_CSS } from "@/utils/disableTextSelection";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fa">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: DISABLE_TEXT_SELECTION_CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
