/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AuthTokenCreateFormInputValues = {
    token?: string;
    used?: string;
    userID?: string;
};
export declare type AuthTokenCreateFormValidationValues = {
    token?: ValidationFunction<string>;
    used?: ValidationFunction<string>;
    userID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AuthTokenCreateFormOverridesProps = {
    AuthTokenCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    token?: PrimitiveOverrideProps<TextFieldProps>;
    used?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AuthTokenCreateFormProps = React.PropsWithChildren<{
    overrides?: AuthTokenCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AuthTokenCreateFormInputValues) => AuthTokenCreateFormInputValues;
    onSuccess?: (fields: AuthTokenCreateFormInputValues) => void;
    onError?: (fields: AuthTokenCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AuthTokenCreateFormInputValues) => AuthTokenCreateFormInputValues;
    onValidate?: AuthTokenCreateFormValidationValues;
} & React.CSSProperties>;
export default function AuthTokenCreateForm(props: AuthTokenCreateFormProps): React.ReactElement;
