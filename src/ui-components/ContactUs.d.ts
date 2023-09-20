/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, IconProps, SelectFieldProps, TextFieldProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContactUsOverridesProps = {
    ContactUs?: PrimitiveOverrideProps<FlexProps>;
    "Frame 31"?: PrimitiveOverrideProps<FlexProps>;
    "Need assistance?"?: PrimitiveOverrideProps<TextProps>;
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."?: PrimitiveOverrideProps<TextProps>;
    "Frame 24"?: PrimitiveOverrideProps<FlexProps>;
    "US HELP CENTER"?: PrimitiveOverrideProps<TextProps>;
    "/"?: PrimitiveOverrideProps<TextProps>;
    "SUBMIT A REQUEST"?: PrimitiveOverrideProps<TextProps>;
    SelectField29766935?: PrimitiveOverrideProps<SelectFieldProps>;
    TextField29766936?: PrimitiveOverrideProps<TextFieldProps>;
    SelectField29766937?: PrimitiveOverrideProps<SelectFieldProps>;
    TextField29766938?: PrimitiveOverrideProps<TextFieldProps>;
    TextField29766939?: PrimitiveOverrideProps<TextFieldProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
    "Frame 2829766941"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 2829766942"?: PrimitiveOverrideProps<FlexProps>;
    Icon29766943?: PrimitiveOverrideProps<ViewProps>;
    Vector29766944?: PrimitiveOverrideProps<IconProps>;
    Instagram?: PrimitiveOverrideProps<TextProps>;
    "Frame 30"?: PrimitiveOverrideProps<FlexProps>;
    Icon29766947?: PrimitiveOverrideProps<ViewProps>;
    Vector29766948?: PrimitiveOverrideProps<IconProps>;
    Twitter?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type ContactUsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: ContactUsOverridesProps | undefined | null;
}>;
export default function ContactUs(props: ContactUsProps): React.ReactElement;
