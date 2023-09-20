/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Survey } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SurveyUpdateFormInputValues = {
    classId?: string;
    userId?: string;
    questionnaireVersion?: string;
    scores?: number[];
};
export declare type SurveyUpdateFormValidationValues = {
    classId?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
    questionnaireVersion?: ValidationFunction<string>;
    scores?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SurveyUpdateFormOverridesProps = {
    SurveyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    classId?: PrimitiveOverrideProps<TextFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    questionnaireVersion?: PrimitiveOverrideProps<TextFieldProps>;
    scores?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SurveyUpdateFormProps = React.PropsWithChildren<{
    overrides?: SurveyUpdateFormOverridesProps | undefined | null;
} & {
    id?: {
        classId: string;
        userId: string;
    };
    survey?: Survey;
    onSubmit?: (fields: SurveyUpdateFormInputValues) => SurveyUpdateFormInputValues;
    onSuccess?: (fields: SurveyUpdateFormInputValues) => void;
    onError?: (fields: SurveyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SurveyUpdateFormInputValues) => SurveyUpdateFormInputValues;
    onValidate?: SurveyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SurveyUpdateForm(props: SurveyUpdateFormProps): React.ReactElement;
