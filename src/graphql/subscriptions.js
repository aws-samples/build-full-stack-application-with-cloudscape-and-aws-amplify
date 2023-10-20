/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass($filter: ModelSubscriptionClassFilterInput) {
    onCreateClass(filter: $filter) {
      id
      name
      description
      image
      class_flag
      courseId
      url
      comments {
        nextToken
        __typename
      }
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass($filter: ModelSubscriptionClassFilterInput) {
    onUpdateClass(filter: $filter) {
      id
      name
      description
      image
      class_flag
      courseId
      url
      comments {
        nextToken
        __typename
      }
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass($filter: ModelSubscriptionClassFilterInput) {
    onDeleteClass(filter: $filter) {
      id
      name
      description
      image
      class_flag
      courseId
      url
      comments {
        nextToken
        __typename
      }
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
      id
      classId
      content
      owners
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
      id
      classId
      content
      owners
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
      id
      classId
      content
      owners
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateReward = /* GraphQL */ `
  subscription OnCreateReward(
    $filter: ModelSubscriptionRewardFilterInput
    $owner: String
  ) {
    onCreateReward(filter: $filter, owner: $owner) {
      id
      classId
      userId
      duration
      played
      point
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateReward = /* GraphQL */ `
  subscription OnUpdateReward(
    $filter: ModelSubscriptionRewardFilterInput
    $owner: String
  ) {
    onUpdateReward(filter: $filter, owner: $owner) {
      id
      classId
      userId
      duration
      played
      point
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteReward = /* GraphQL */ `
  subscription OnDeleteReward(
    $filter: ModelSubscriptionRewardFilterInput
    $owner: String
  ) {
    onDeleteReward(filter: $filter, owner: $owner) {
      id
      classId
      userId
      duration
      played
      point
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onCreateProfile(filter: $filter, owner: $owner) {
      id
      point
      userId
      name
      organization
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onUpdateProfile(filter: $filter, owner: $owner) {
      id
      point
      userId
      name
      organization
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onDeleteProfile(filter: $filter, owner: $owner) {
      id
      point
      userId
      name
      organization
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateSurvey = /* GraphQL */ `
  subscription OnCreateSurvey(
    $filter: ModelSubscriptionSurveyFilterInput
    $owner: String
  ) {
    onCreateSurvey(filter: $filter, owner: $owner) {
      classId
      userId
      questionnaireVersion
      scores
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateSurvey = /* GraphQL */ `
  subscription OnUpdateSurvey(
    $filter: ModelSubscriptionSurveyFilterInput
    $owner: String
  ) {
    onUpdateSurvey(filter: $filter, owner: $owner) {
      classId
      userId
      questionnaireVersion
      scores
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteSurvey = /* GraphQL */ `
  subscription OnDeleteSurvey(
    $filter: ModelSubscriptionSurveyFilterInput
    $owner: String
  ) {
    onDeleteSurvey(filter: $filter, owner: $owner) {
      classId
      userId
      questionnaireVersion
      scores
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onCreateChannel(filter: $filter, owner: $owner) {
      id
      name
      icon
      messges {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateChannel = /* GraphQL */ `
  subscription OnUpdateChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onUpdateChannel(filter: $filter, owner: $owner) {
      id
      name
      icon
      messges {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteChannel = /* GraphQL */ `
  subscription OnDeleteChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onDeleteChannel(filter: $filter, owner: $owner) {
      id
      name
      icon
      messges {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
