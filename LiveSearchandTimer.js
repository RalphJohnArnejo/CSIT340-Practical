import React, { useState, useEffect } from 'react';

const USERS = [
    {
        id: 1,
        name: 'Ana Cruz',
        role: 'Developer'
    },
    {
        id: 2,
        name: 'Ben Lim',
        role: 'Designer'
    },
    {
        id: 3,
        name: 'Cara Yu',
        role: 'Tester'
    },
    {
        id: 4,
        name: 'Dan Go',
        role: 'Developer'
    }
];

export default function LiveSearchandTimer() {
    const [query, setQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(USERS);
    const [isSearching, setIsSearching] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            setSeconds(prev = prev + 1);
        }, 1000)
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        setIsSearching(true);

        const debounceTimer = setTimeout(() => {
            const lowerQuery = query.trim().toLowerCase();
            const results = USERS.filter(user =>
                user.name.toLowerCase().includes(lowerQuery) ||
                user.role.toLowerCase().includes(lowerQuery)
            )
            setFilteredUsers(results);
            setIsSearching(false);
        }, 400);

        return () => clearTimeout(debounceTimer);

    }, [query]);

    useEffect(() => {
        document.title = `Users found: ${filteredUsers.length} | Session: ${seconds}s`;

    }, [filteredUsers.length, seconds]);

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    return (
        <div style={{ maxWidth: '520px', margin: '20px auto', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', fontFamily: 'sans-serif', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, color: '#1e293b' }}>Live Search & Timer</h2>
                <div style={{ background: '#eff6ff', color: '#1d4ed8', padding: '6px 12px', borderRadius: '9999px', fontSize: '14px', fontWeight: 'bold' }}>
                    ⏱️ Session: {formatTime(seconds)} ({seconds}s)
                </div>
            </div>

            <div style={{ marginBottom: '16px', position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search by name or role..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' }}
                />
                {isSearching && (
                    <span style={{ position: 'absolute', right: '12px', top: '10px', fontSize: '13px', color: '#94a3b8' }}>
                        Searching...
                    </span>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                    Results ({filteredUsers.length}):
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Check browser tab title for sync
                </span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, border: '1px solid #f1f5f9', borderRadius: '8px', overflow: 'hidden' }}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f8fafc', background: '#ffffff' }}>
                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{user.name}</span>
                            <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>
                                {user.role}
                            </span>
                        </li>
                    ))
                ) : (
                    <li style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                        No users matching "{query}"
                    </li>
                )}
            </ul>
        </div>
    );
}