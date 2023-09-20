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
export declare type RewardCreateFormInputValues = {
    point?: number;
    userID?: string;
};
export declare type RewardCreateFormValidationValues = {
    point?: ValidationFunction<number>;
    userID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RewardCreateFormOverridesProps = {
    RewardCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    point?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RewardCreateFormProps = React.PropsWithChildren<{
    overrides?: RewardCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RewardCreateFormInputValues) => RewardCreateFormInputValues;
    onSuccess?: (fields: RewardCreateFormInputValues) => void;
    onError?: (fields: RewardCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RewardCreateFormInputValues) => RewardCreateFormInputValues;
    onValidate?: RewardCreateFormValidationValues;
} & React.CSSProperties>;
export default function RewardCreateForm(props: RewardCreateFormProps): React.ReactElement;
