import { gql } from "@apollo/client";

export const GET_COUNTERS = gql`
  {
    getCounters {
      id
      author
      color
      isStreamed
      title
      value
    }
  }
`;

export const GET_COUNTER_BY_ID = gql`
  {
    getCounterById(id: $counterId) {
      id
      author
      color
      isStreamed
      title
      value
    }
  }
`;

export const GET_SURVEYS = gql`
  {
    getSurveys {
      id
      title
      fields {
        name
        percent
      }
      author
      index
      color
    }
  }
`;

export const GET_TIMERS = gql`
  {
    getTimers {
      id
      title
      color
      author
      format
      display
      type
      defaultValue
      values
    }
  }
`;
export const CREATE_COUNTER = gql`
  mutation Mutation($counter: CounterInput) {
    createCounter(counter: $counter) {
      id
      author
      color
      isStreamed
      title
      value
    }
  }
`;

export const CREATE_TIMER = gql`
  mutation Mutation($timer: TimerInput) {
    createTimer(timer: $timer) {
      id
      title
      color
      author
      format
      display
      type
      defaultValue
      values
    }
  }
`;

export const CREATE_SURVEY = gql`
  mutation Mutation($survey: SurveyInput) {
    createSurvey(survey: $survey) {
      id
      title
      fields
      author
      index
      color
    }
  }
`;

export const DELETE_COUNTER = gql`
  mutation DeleteCounter($deleteCounterId: String!) {
    deleteCounter(id: $deleteCounterId)
  }
`;

export const DELETE_TIMER = gql`
  mutation DeleteTimer($deleteTimerId: String!) {
    deleteTimer(id: $deleteTimerId)
  }
`;

export const UPDATE_COUNTER = gql`
  mutation UpdateCounter($updateCounterId: String!, $input: CounterInput) {
    updateCounter(id: $updateCounterId, input: $input) {
      value
      isStreamed
    }
  }
`;

export const UPDATE_TIMER = gql`
  mutation UpdateTimer($updateTimerId: String!, $input: TimerInput) {
    updateTimer(id: $updateTimerId, input: $input) {
      title
      color
      author
      format
      display
      type
      defaultValue
      values
    }
  }
`;
