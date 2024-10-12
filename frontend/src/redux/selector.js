// src/redux/selectors.js
import { createSelector } from 'reselect';

// Selector to get the team slice from the state
const selectTeam = (state) => state.team;

// Memoized selector to get all team members
export const selectAllTeamMembers = createSelector(
    [selectTeam],
    (team) => {
        const teams = team?.teams || [];
        return teams.flatMap(t => t.members || []); // Safely access members and flatten the array
    }
);

// Memoized selector to get members by role
export const selectMembersByRole = (role) => createSelector(
    [selectAllTeamMembers], // Use the previously defined selector as an input
    (members) => {
        return members.filter(member => member.role === role); // Filter members by the specified role
    }
);
// src/redux/selector.js
export const selectAllTeams = (state) => state.team; // Adjust the path based on your state structure
