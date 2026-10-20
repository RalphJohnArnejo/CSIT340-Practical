import React, { useReducer, useEffect, useState } from 'react';


export const INITIAL_STATE = {
    issues: [],
    filter: 'all',
    nextId: 1
};

export function issueReducer(state, action) {
    switch (action.type) {
        case 'ADD_ISSUE': {
            if (!action.payload || !action.payload.title || !action.payload.title.trim()) {
                return state;
            }
            const newIssue = {
                id: state.nextId,
                title: action.payload.title.trim(),
                done: false
            };
            return {
                ...state,
                issues: [...state.issues, newIssue],
                nextId: state.nextId + 1
            };
        }

        case 'TOGGLE_ISSUE': {
            return {
                ...state,
                issues: state.issues.map(issue =>
                    issue.id === action.payload.id
                        ? { ...issue, done: !issue.done }
                        : issue
                )
            };
        }

        case 'DELETE_ISSUE': {
            return {
                ...state,
                issues: state.issues.filter(issue => issue.id !== action.payload.id)
            };
        }

        case 'SET_FILTER': {
            return {
                ...state,
                filter: action.payload.filter
            };
        }

        case 'CLEAR_DONE': {
            return {
                ...state,
                issues: state.issues.filter(issue => !issue.done)
            };
        }

        default:
            return state;
    }
}


export function usePersistentReducer(reducer, defaultState, key = 'issue_tracker_state') {
    const [state, dispatch] = useReducer(reducer, defaultState, (initial) => {
        try {
            const persisted = localStorage.getItem(key);
            return persisted ? JSON.parse(persisted) : initial;
        } catch {
            return initial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch { }
    }, [state, key]);

    return [state, dispatch];
}


export function runReducerTests() {
    const s1 = issueReducer(INITIAL_STATE, { type: 'ADD_ISSUE', payload: { title: 'Test issue' } });
    const s2 = issueReducer(s1, { type: 'TOGGLE_ISSUE', payload: { id: 1 } });
    const s3 = issueReducer(s2, { type: 'CLEAR_DONE' });

    return [
        { name: 'ADD_ISSUE adds new item', passed: s1.issues.length === 1 && s1.nextId === 2 },
        { name: 'TOGGLE_ISSUE toggles status', passed: s2.issues[0]?.done === true },
        { name: 'CLEAR_DONE removes completed', passed: s3.issues.length === 0 }
    ];
}

export default function IssueTracker() {
    const [state, dispatch] = usePersistentReducer(issueReducer, INITIAL_STATE);
    const [titleInput, setTitleInput] = useState('');
    const [testResults, setTestResults] = useState(null);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!titleInput.trim()) return;
        dispatch({ type: 'ADD_ISSUE', payload: { title: titleInput } });
        setTitleInput('');
    };

    const filteredIssues = state.issues.filter(i => {
        if (state.filter === 'open') return !i.done;
        if (state.filter === 'done') return i.done;
        return true;
    });