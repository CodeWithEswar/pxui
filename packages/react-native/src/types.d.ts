declare module "react-native-svg" {
  import * as React from "react";
  export const Svg: React.ComponentType<any>;
  export const Path: React.ComponentType<any>;
  export default Svg;
}

declare module "react-native" {
  export interface ViewProps {
    [key: string]: any;
  }
}
