import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      green: string;
      greenBright: string;
      greenDark: string;
      greenWhite: string;
      white: string;
      greenWhiteHover: string;
      darkGrey: string;
      danger: string;
      dangerHover: string;
    };
    fontFamily: string;
  }
}
