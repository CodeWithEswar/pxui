declare module "react-native-svg" {
  import * as React from "react";
  export interface SvgProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    children?: React.ReactNode;
  }
  export interface PathProps {
    d: string;
    fill?: string;
    fillRule?: "nonzero" | "evenodd";
    clipRule?: "nonzero" | "evenodd";
  }
  export const Svg: React.ComponentType<SvgProps>;
  export const Path: React.ComponentType<PathProps>;
  export default Svg;
}

declare module "react-native" {
  export interface ViewProps {
    [key: string]: unknown;
  }
}
