/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { AuthToken } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AuthTokenUpdateFormInputValues = {
    token?: string;
    used?: string;
    userID?: string;
};
export declare type AuthTokenUpdateFormValidationValues = {
    token?: ValidationFunction<string>;
    used?: ValidationFunction<string>;
    userID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AuthTokenUpdateFormOverridesProps = {
    AuthTokenUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    token?: PrimitiveOverrideProps<TextFieldProps>;
    used?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AuthTokenUpdateFormProps = React.PropsWithChildren<{
    overrides?: AuthTokenUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    authToken?: AuthToken;
    onSubmit?: (fields: AuthTokenUpdateFormInputValues) => AuthTokenUpdateFormInputValues;
    onSuccess?: (fields: AuthTokenUpdateFormInputValues) => void;
    onError?: (fields: AuthTokenUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AuthTokenUpdateFormInputValues) => AuthTokenUpdateFormInputValues;
    onValidate?: AuthTokenUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AuthTokenUpdateForm(props: AuthTokenUpdateFormProps): React.ReactElement;
