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
        <div>
            <input type="text" placeholder='search users' value={query} onChange={(e) => setQuery(e.target.value)} />

        </div>
    )