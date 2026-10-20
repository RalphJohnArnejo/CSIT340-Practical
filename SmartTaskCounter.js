import React, { useState } from 'react';
export default function SmartTaskCounter() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(5);
    const status = count === 0
        ? 'Not started'
        : count >= target
            ? 'Target reached'
            : 'In progress';

    const isTargetReached = count >= target;

    const handleIncrement = () => {
        if (!isTargetReached) {
            setCount(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        setCount(prev => Math.max(0, prev - 1));
    };

    const handleReset = () => {
        setCount(0);
    };

    const handleAddTwo = () => {
        if (count + 2 <= target) {
            setCount(prev => prev + 1);
            setCount(prev => prev + 1);
        } else if (count + 1 === target) {
            setCount(prev => prev + 1);
        }
    };

    return (
        <div style={{ maxWidth: '420px', margin: '20px auto', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', fontFamily: 'sans-serif', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginTop: 0, color: '#1e293b' }}>Smart Task Counter</h2>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#475569' }}>
                    Target Tasks:
                    <input
                        type="number"
                        min="1"
                        value={target}
                        onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        style={{ marginLeft: '10px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                <div>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Completed Tasks:</span>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>{count}</div>
                </div>
                <div>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Status:</span>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        background: count >= target ? '#dcfce7' : count > 0 ? '#fef3c7' : '#f1f5f9',
                        color: count >= target ? '#166534' : count > 0 ? '#92400e' : '#475569'
                    }}>
                        {status}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '10px' }}>
                <button
                    onClick={handleIncrement}
                    disabled={isTargetReached}
                    style={{ padding: '10px', borderRadius: '6px', border: 'none', background: isTargetReached ? '#cbd5e1' : '#3b82f6', color: 'white', fontWeight: 'bold', cursor: isTargetReached ? 'not-allowed' : 'pointer' }}
                >
                    +1 Increment
                </button>

                <button
                    onClick={handleAddTwo}
                    disabled={isTargetReached}
                    style={{ padding: '10px', borderRadius: '6px', border: 'none', background: isTargetReached ? '#cbd5e1' : '#2563eb', color: 'white', fontWeight: 'bold', cursor: isTargetReached ? 'not-allowed' : 'pointer' }}
                >
                    +2 (Queued)
                </button>

                <button
                    onClick={handleDecrement}
                    disabled={count === 0}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#334155', fontWeight: 'bold', cursor: count === 0 ? 'not-allowed' : 'pointer' }}
                >
                    -1 Decrement
                </button>

                <button
                    onClick={handleReset}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ef4444', background: '#fef2f2', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    Reset
                </button>
            </div>
        </div>
    );



}