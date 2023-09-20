/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Reward } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RewardUpdateFormInputValues = {
    point?: number;
    userID?: string;
};
export declare type RewardUpdateFormValidationValues = {
    point?: ValidationFunction<number>;
    userID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RewardUpdateFormOverridesProps = {
    RewardUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    point?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RewardUpdateFormProps = React.PropsWithChildren<{
    overrides?: RewardUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    reward?: Reward;
    onSubmit?: (fields: RewardUpdateFormInputValues) => RewardUpdateFormInputValues;
    onSuccess?: (fields: RewardUpdateFormInputValues) => void;
    onError?: (fields: RewardUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RewardUpdateFormInputValues) => RewardUpdateFormInputValues;
    onValidate?: RewardUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RewardUpdateForm(props: RewardUpdateFormProps): React.ReactElement;
