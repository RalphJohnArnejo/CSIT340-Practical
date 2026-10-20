import React, { useState, useRef } from "react";


export default function AccessibleFormToolkit() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [lastSubmittedEmail, setLastSubmittedEmail] = useState('');


    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);


    const previousEmailRef = useRef('');

    const validate = () => {
        const errs = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) {
            errs.name = 'Name is required.';
        }

        if (!formData.email.trim()) {
            errs.email = 'Email is required.';
        } else if (!emailRegex.test(formData.email)) {
            errs.email = 'Invalid email address.';


            if (formData.password) {
                errs.password = 'Password is required.';
            } else if (formData.password.length < 8) {
                errs.password = 'Password must be atleast 8 characters.';
            }

            return errs;
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const validationErrors = validate();
            setErrors(validationErrors);

            if (validationErrors.name) {
                nameInputRef.current?.focus();
                return;
            }
            if (validationErrors.email) {
                emailInputRef.current?.focus();
                return;
            }
            if (validationErrors.password) {
                passwordInputRef.current?.focus();
                return;
            }

            setLastSubmittedEmail(previousEmailRef.current);

            previousEmailRef.current = formData.email;

            setFormData({ name: '', email: '', password: '' });
        };

        return (
            <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
                <h2 style={{ marginTop: 0 }}>Accessible Form Toolkit</h2>

                {lastSubmittedEmail && (
                    <div style={{ background: '#e8f5e9', padding: '8px 12px', borderRadius: '4px', marginBottom: '12px', fontSize: '14px' }}>
                        Previously submitted email: <strong>{lastSubmittedEmail}</strong>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div style={{ marginBottom: '12px' }}>
                        <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                            Name:
                        </label>
                        <input
                            id="name"
                            ref={nameInputRef}
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', boxSizing: 'border-box', padding: '6px' }}
                        />
                        {errors.name && <div style={{ color: 'red', fontSize: '12px', marginTop: '2px' }}>{errors.name}</div>}
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                            Email:
                        </label>
                        <input
                            id="email"
                            ref={emailInputRef}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: '100%', boxSizing: 'border-box', padding: '6px' }}
                        />
                        {errors.email && <div style={{ color: 'red', fontSize: '12px', marginTop: '2px' }}>{errors.email}</div>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                            Password:
                        </label>
                        <input
                            id="password"
                            ref={passwordInputRef}
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            style={{ width: '100%', boxSizing: 'border-box', padding: '6px' }}
                        />
                        {errors.password && <div style={{ color: 'red', fontSize: '12px', marginTop: '2px' }}>{errors.password}</div>}
                    </div>

                    <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
