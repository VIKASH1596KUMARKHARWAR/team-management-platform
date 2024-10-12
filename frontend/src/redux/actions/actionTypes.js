// actionTypes.js

// User Authentication Actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOADING = 'LOADING'; // Add this line
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

// Teams Actions
// actionTypes.js
export const GET_TEAMS = 'GET_TEAMS';
export const CREATE_TEAM = 'CREATE_TEAM';
export const DELETE_TEAM = 'DELETE_TEAM';
export const ERROR = 'ERROR'; // Add error action type
export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER'; // Add this line


// To-Dos Actions
export const GET_TODOS = 'GET_TODOS';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO'; // Add if needed
