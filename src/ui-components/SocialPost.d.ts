/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
import { MyIconProps } from "./MyIcon";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SocialPostOverridesProps = {
    SocialPost?: PrimitiveOverrideProps<FlexProps>;
    Body?: PrimitiveOverrideProps<FlexProps>;
    Text?: PrimitiveOverrideProps<FlexProps>;
    Headline?: PrimitiveOverrideProps<FlexProps>;
    "New Amplify Studio gives designers the ability to export UI to React code"?: PrimitiveOverrideProps<TextProps>;
    Frame?: PrimitiveOverrideProps<FlexProps>;
    "Nikhil S"?: PrimitiveOverrideProps<TextProps>;
    "2nd December 2021"?: PrimitiveOverrideProps<TextProps>;
    Article?: PrimitiveOverrideProps<FlexProps>;
    MyIcon29766860?: MyIconProps;
    "AWS Amplify Studio is a visual development environment for building full-stack web and mobile apps that grows with your business. Studio builds on existing backend building capabilities in AWS Amplify, allowing you to build your UI faster with a set of ready-to-use UI components that are editable in Figma. With Studio, you can quickly build an entire web app, front-to-back, with minimal coding, while still maintaining full control over your app design and behavior through code. Ship faster, scale effortlessly, and delight every user."?: PrimitiveOverrideProps<TextProps>;
    Share29766862?: PrimitiveOverrideProps<FlexProps>;
    Share29766863?: PrimitiveOverrideProps<TextProps>;
    MyIcon29766864?: MyIconProps;
    MyIcon29766865?: MyIconProps;
    MyIcon29766866?: MyIconProps;
    image?: PrimitiveOverrideProps<ImageProps>;
    "Read more29766868"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon29766869?: MyIconProps;
    "Read more29766870"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type SocialPostProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: SocialPostOverridesProps | undefined | null;
}>;
export default function SocialPost(props: SocialPostProps): React.ReactElement;
