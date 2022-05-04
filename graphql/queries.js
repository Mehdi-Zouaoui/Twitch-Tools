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
export const GET_SURVEYS = gql`
  {
    getSurveys {
      id
      title
      fields {
        name
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
