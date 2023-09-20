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
export declare type SurveyCreateFormInputValues = {
    classId?: string;
    userId?: string;
    questionnaireVersion?: string;
    scores?: number[];
};
export declare type SurveyCreateFormValidationValues = {
    classId?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
    questionnaireVersion?: ValidationFunction<string>;
    scores?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SurveyCreateFormOverridesProps = {
    SurveyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    classId?: PrimitiveOverrideProps<TextFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    questionnaireVersion?: PrimitiveOverrideProps<TextFieldProps>;
    scores?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SurveyCreateFormProps = React.PropsWithChildren<{
    overrides?: SurveyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SurveyCreateFormInputValues) => SurveyCreateFormInputValues;
    onSuccess?: (fields: SurveyCreateFormInputValues) => void;
    onError?: (fields: SurveyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SurveyCreateFormInputValues) => SurveyCreateFormInputValues;
    onValidate?: SurveyCreateFormValidationValues;
} & React.CSSProperties>;
export default function SurveyCreateForm(props: SurveyCreateFormProps): React.ReactElement;
