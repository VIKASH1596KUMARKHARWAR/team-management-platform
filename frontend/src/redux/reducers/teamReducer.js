import {
    GET_TEAMS,
    CREATE_TEAM,
    DELETE_TEAM,
    ERROR,
    LOADING,
    ADD_TEAM_MEMBER
} from '../actions/actionTypes';

const initialState = {
    teams: [],
    loading: false,
    error: null,
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case ERROR:
            return { ...state, loading: false, error: action.payload };
        case GET_TEAMS:
            return {
                ...state,
                loading: false,
                teams: action.payload.map(team => ({
                    ...team,
                    members: team.members || []  // Ensure members array is present
                })),
                error: null
            };
        case CREATE_TEAM:
            return { 
                ...state, 
                loading: false, 
                teams: [...state.teams, { ...action.payload, members: [] }],  // Initialize with empty members array
                error: null 
            };
        case DELETE_TEAM:
            return {
                ...state,
                loading: false,
                teams: state.teams.filter(team => team._id !== action.payload),
                error: null
            };
        case ADD_TEAM_MEMBER:
            return {
                ...state,
                loading: false,
                teams: state.teams.map(team =>
                    team._id === action.payload.teamId
                        ? { ...team, members: [...(team.members || []), action.payload.member] }
                        : team
                ),
                error: null,
            };
        default:
            return state;
    }
};

export default teamReducer;
