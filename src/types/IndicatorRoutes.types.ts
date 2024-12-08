import DashboardIcons from "./DashboardIcons";

export default interface IndicatorRoute {
  path: string;
  title: string;
  content?: JSX.Element;
  shortTitle?: string;
  keyname?: string;
  icon?: DashboardIcons | string;
  show?: boolean;
}