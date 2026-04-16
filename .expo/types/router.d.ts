/* eslint-disable */
import * as Router from "expo-router";

export * from "expo-router";

declare module "expo-router" {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams:
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/about`; params?: Router.UnknownInputParams }
        | { pathname: `/categories`; params?: Router.UnknownInputParams }
        | { pathname: `/contact`; params?: Router.UnknownInputParams }
        | { pathname: `/`; params?: Router.UnknownInputParams }
        | { pathname: `/modal`; params?: Router.UnknownInputParams }
        | { pathname: `/myLibrary`; params?: Router.UnknownInputParams }
        | { pathname: `/offers`; params?: Router.UnknownInputParams }
        | { pathname: `/_sitemap`; params?: Router.UnknownInputParams };
      hrefOutputParams:
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownOutputParams;
          }
        | { pathname: `/about`; params?: Router.UnknownOutputParams }
        | { pathname: `/categories`; params?: Router.UnknownOutputParams }
        | { pathname: `/contact`; params?: Router.UnknownOutputParams }
        | { pathname: `/`; params?: Router.UnknownOutputParams }
        | { pathname: `/modal`; params?: Router.UnknownOutputParams }
        | { pathname: `/myLibrary`; params?: Router.UnknownOutputParams }
        | { pathname: `/offers`; params?: Router.UnknownOutputParams }
        | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams };
      href:
        | Router.RelativePathString
        | Router.ExternalPathString
        | `/about${`?${string}` | `#${string}` | ""}`
        | `/categories${`?${string}` | `#${string}` | ""}`
        | `/contact${`?${string}` | `#${string}` | ""}`
        | `/${`?${string}` | `#${string}` | ""}`
        | `/modal${`?${string}` | `#${string}` | ""}`
        | `/myLibrary${`?${string}` | `#${string}` | ""}`
        | `/offers${`?${string}` | `#${string}` | ""}`
        | `/_sitemap${`?${string}` | `#${string}` | ""}`
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/about`; params?: Router.UnknownInputParams }
        | { pathname: `/categories`; params?: Router.UnknownInputParams }
        | { pathname: `/contact`; params?: Router.UnknownInputParams }
        | { pathname: `/`; params?: Router.UnknownInputParams }
        | { pathname: `/modal`; params?: Router.UnknownInputParams }
        | { pathname: `/myLibrary`; params?: Router.UnknownInputParams }
        | { pathname: `/offers`; params?: Router.UnknownInputParams }
        | { pathname: `/_sitemap`; params?: Router.UnknownInputParams };
    }
  }
}
