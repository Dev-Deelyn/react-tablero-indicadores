import { ReactElement } from "react";

export default interface IndicatorRoutes {
  path: string;
  title: string;
  content?: ReactElement;
  shortTitle?: string;
  icon?: string;
  show?: boolean;
}