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
    return (
        <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ margin: 0 }}>Issue Tracker</h2>
                <button onClick={() => setTestResults(runReducerTests())} style={{ padding: '4px 8px', cursor: 'pointer' }}>
                    Run Tests
                </button>
            </div>

            {testResults && (
                <div style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', marginBottom: '12px', fontSize: '13px' }}>
                    {testResults.map((t, idx) => (
                        <div key={idx} style={{ color: t.passed ? 'green' : 'red' }}>
                            {t.passed ? '✓' : '✗'} {t.name}
                        </div>
                    ))}
                </div>
            )}

            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                <input
                    type="text"
                    placeholder="New issue..."
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    style={{ flex: 1, padding: '6px' }}
                />
                <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>
                    Add
                </button>
            </form>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px' }}>
                {['all', 'open', 'done'].map(f => (
                    <button
                        key={f}
                        onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: f } })}
                        style={{
                            padding: '4px 8px',
                            fontWeight: state.filter === f ? 'bold' : 'normal',
                            cursor: 'pointer'
                        }}
                    >
                        {f.toUpperCase()} ({state.issues.filter(i => f === 'all' ? true : f === 'done' ? i.done : !i.done).length})
                    </button>
                ))}

                <button
                    onClick={() => dispatch({ type: 'CLEAR_DONE' })}
                    style={{ marginLeft: 'auto', padding: '4px 8px', cursor: 'pointer' }}
                >
                    Clear Done
                </button>
            </div>

            <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                {filteredIssues.map(issue => (
                    <li key={issue.id} style={{ marginBottom: '6px' }}>
                        <label style={{ cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={issue.done}
                                onChange={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: issue.id } })}
                            />
                            <span style={{ textDecoration: issue.done ? 'line-through' : 'none', marginLeft: '6px' }}>
                                {issue.title}
                            </span>
                        </label>
                        <button
                            onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: issue.id } })}
                            style={{ marginLeft: '8px', padding: '1px 5px', cursor: 'pointer' }}
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
