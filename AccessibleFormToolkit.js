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

