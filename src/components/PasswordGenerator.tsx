import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import styles from '../styles/Password.module.css';


function PasswordGenerator() {
    const { state, dispatch } = useContext(AppContext);

    function generatePassword() {
        const { length, useSpecialCharacters, useNumbers, useUppercase } = state.options;

        let characters = 'abcdefghijklmnopqrstuvwxyz';
        if (useUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useSpecialCharacters) characters += '!@#$%^&*()_+-={}[];:"|,./?';
        if (useNumbers) characters += '0123456789';

        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        dispatch({ type: 'updatePassword', payload: password });
    }

    function handleLengthChange(event: React.ChangeEvent<HTMLInputElement>) {
        const length = parseInt(event.target.value);
        const options = { ...state.options, length };
        dispatch({ type: 'updateOptions', payload: options });
    }

    function handleSpecialCharactersChange(event: React.ChangeEvent<HTMLInputElement>) {
        const useSpecialCharacters = event.target.checked;
        const options = { ...state.options, useSpecialCharacters };
        dispatch({ type: 'updateOptions', payload: options });
    }

    function handleNumbersChange(event: React.ChangeEvent<HTMLInputElement>) {
        const useNumbers = event.target.checked;
        const options = { ...state.options, useNumbers };
        dispatch({ type: 'updateOptions', payload: options });
    }

    function handleUppercaseChange(event: React.ChangeEvent<HTMLInputElement>) {
        const useUppercase = event.target.checked;
        const options = { ...state.options, useUppercase };
        dispatch({ type: 'updateOptions', payload: options });
    }

    return (
        <div>
            <h1>Password Generator</h1>
            <label>
                Length:
                <input type="number" value={state.options.length} onChange={handleLengthChange} />
            </label>
            <label>
                Use special characters:
                <input type="checkbox" checked={state.options.useSpecialCharacters} onChange={handleSpecialCharactersChange} />
            </label>
            <label>
                Use numbers:
                <input type="checkbox" checked={state.options.useNumbers} onChange={handleNumbersChange} />
            </label>
            <label>
                Use uppercase:
                <input type="checkbox" checked={state.options.useUppercase} onChange={handleUppercaseChange} />
            </label>
            <button onClick={generatePassword} className={styles.button}>Generate Password</button>
            <label>
                Generated Password:
                {state.password}
            </label>
        </div>
    );
}

export default PasswordGenerator;
