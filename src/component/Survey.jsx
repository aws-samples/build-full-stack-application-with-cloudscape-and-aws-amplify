// ui
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  RadioGroup,
  SpaceBetween,
} from "@cloudscape-design/components";

// apis
import { API, graphqlOperation } from 'aws-amplify'
import { getSurvey } from '../graphql/queries'
import { createSurvey } from '../graphql/mutations'

const survey = {
  questionnaire: [
    {
      item: 'Are you satisfied with the content?',
      response: null,
      scale: [
        { value: 5, label: "Strongly Agree" },
        { value: 4, label: "Agree" },
        { value: 3, label: "Indifferent" },
        { value: 2, label: "Disagree" },
        { value: 1, label: "Strongly disagree" }
      ]
    },
    {
      item: 'Are you satisfied with the instructor?',
      response: null,
      response: null,
      scale: [
        { value: 5, label: "Strongly Agree" },
        { value: 4, label: "Agree" },
        { value: 3, label: "Indifferent" },
        { value: 2, label: "Disagree" },
        { value: 1, label: "Strongly disagree" }
      ]
    },
    {
      item: 'Was the difficulty level high?',
      response: null,
      scale: [
        { value: 5, label: "Strongly Agree" },
        { value: 4, label: "Agree" },
        { value: 3, label: "Indifferent" },
        { value: 2, label: "Disagree" },
        { value: 1, label: "Strongly disagree" }
      ]
    },
    {
      item: 'Have you gained new knowledge and skills that you can apply to your future use of AWS services?',
      response: null,
      scale: [
        { value: 5, label: "Strongly Agree" },
        { value: 4, label: "Agree" },
        { value: 3, label: "Indifferent" },
        { value: 2, label: "Disagree" },
        { value: 1, label: "Strongly disagree" }
      ]
    }
  ],
}

export function Survey(props) {
  const [visible, setVisible] = useState(false);
  const [surveyResult] = useAsyncData(() => getSurveyApi(props.classId, props.userId));

  const submitHandler = (e) => {
    setVisible(false);

    let scores = [];
    let complete = true;
    survey.questionnaire.forEach(element => {
      if (element.response == null) {
        complete = false;
      }
      scores.push(element.response);
    });

    if (complete) {
      createSurveyApi(props.classId, props.userId, scores);
    }
  }

  return (
    <>
      {
        (!surveyResult || surveyResult == undefined || surveyResult == null) ? (
          <Button onClick={() => setVisible(true)}>Survey</Button>
        ) : (
          <Button disabled>Survey</Button>
        )
      }

      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        size="medium"
        header={props.classTitle}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setVisible(false)}>Cancel</Button>
              <Button variant="primary" onClick={submitHandler}>Confirm</Button>
            </SpaceBetween>
          </Box>
        }
      >
        <SpaceBetween size="m">
        {
          survey.questionnaire.map(question => <Indicator question={question} />)
        }
        </SpaceBetween>
      </Modal>
    </>
  );
}

const Indicator = ({
  question,
}) => {
  const [value, setValue] = useState(null);
  const changeHandler = (e) => {
    setValue(e.detail.value);
    question.response=e.detail.value;
  }

  return (
    <SpaceBetween size="xs">
      <Box fontSize="heading-s" varient="p"><b>{question.item}</b></Box>
      <RadioGroup
        onChange={changeHandler}
        value={value}
        items={question.scale}
      />
    </SpaceBetween>
  );
}

function useAsyncData(loadItem) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItem().then(item => {
      setItem(item);
      setLoading(false);
    });
    return () => {};
  }, [loadItem]);

  return [item, loading];
}

// apis
function createSurveyApi(classId, userId, scores) {
  try {
    API.graphql(graphqlOperation(createSurvey, {
      input: { classId: classId, userId: userId, questionnaireVersion: '20230707', scores: scores }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function getSurveyApi(classId, userId) {
  try {
    return API.graphql(graphqlOperation(getSurvey, {
      classId: classId, userId: userId
    })).then(
      result => {
        return result.data.getSurvey;
    });
  }
  catch (e) {
    console.log({e});
  }
}
