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
export const DELETE_COUNTER = gql`
  mutation Mutation($id: id) {
    deleteCounter(id: $id)
  }
`;
export const UPDATE_COUNTER = gql`
  mutation Mutation($id: id , $counter: CounterInput) {
    updateCounter(id: $id , counter: $counter) {
      id
      author
      color
      isStreamed
      title
      value
    }
  }
`;
