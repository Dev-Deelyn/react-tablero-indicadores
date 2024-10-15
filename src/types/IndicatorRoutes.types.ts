// import { ReactElement } from "react";

export default interface IndicatorRoutes {
  path: string;
  title: string;
  content?: JSX.Element;
  shortTitle?: string;
  icon?: string;
  show?: boolean;
}