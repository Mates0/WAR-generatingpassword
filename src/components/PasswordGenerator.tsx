import React, {useContext} from 'react';
import {AppContext} from './AppContext';
import styles from '../styles/Password.module.css';


function PasswordGenerator() {
    const {state, dispatch} = useContext(AppContext);

    function generatePassword() {
        const {length, useSpecialCharacters, useNumbers, useUppercase} = state.options;

        let characters = 'abcdefghijklmnopqrstuvwxyz';
        if (useUppercase) {
            characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (useNumbers) {
            characters += '0123456789';
        }
        if (useSpecialCharacters) {
            characters += '}_%$":|-[){*.=/+^&@#(!;?],';
        }
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.random() * characters.length);
        }

        dispatch({type: 'updatePassword', payload: password});
    }

    function lengthChange(event: React.ChangeEvent<HTMLInputElement>) {
        const length = parseInt(event.target.value);
        const options = {...state.options, length};
        dispatch({type: 'updateOptions', payload: options});
    }

    function specialCharacters(event: React.ChangeEvent<HTMLInputElement>) {
        const useSpecialCharacters = event.target.checked;
        const options = {...state.options, useSpecialCharacters};
        dispatch({type: 'updateOptions', payload: options});
    }

    function numbersChange(event: React.ChangeEvent<HTMLInputElement>) {
        const useNumbers = event.target.checked;
        const options = {...state.options, useNumbers};
        dispatch({type: 'updateOptions', payload: options});
    }

    function uppercaseChange(event: React.ChangeEvent<HTMLInputElement>) {
        const useUppercase = event.target.checked;
        const options = {...state.options, useUppercase};
        dispatch({type: 'updateOptions', payload: options});
    }

    return (
        <div className={styles.outerwrapper}>
            <div className={styles.center}>
                <h1>Password Generator</h1>
                <h2>Length:</h2>
                <input type="number" value={state.options.length} onChange={lengthChange}
                       className={styles.input}/>
                <div className={styles.container}><h2>Use uppercase:</h2>
                    <input type="checkbox" checked={state.options.useUppercase} onChange={uppercaseChange}
                           className={styles.checkbox}/></div>
                <div className={styles.container}><h2>Use numbers:</h2>
                    <input type="checkbox" checked={state.options.useNumbers} onChange={numbersChange}
                           className={styles.checkbox}/>
                </div>
                <div className={styles.container}><h2>Use special characters:</h2>
                    <input type="checkbox" checked={state.options.useSpecialCharacters}
                           onChange={specialCharacters} className={styles.checkbox}/>
                </div>
                <button onClick={generatePassword} className={styles.button}>Generate Password</button>
                <h2>Generated Password:</h2>
                <h1>{state.password}</h1>
            </div>
        </div>
    );
}

export default PasswordGenerator;