'use client';

import { useCallback, useRef, useState } from 'react';
import getRandomCharacter from '@/utils/generatorPassword';

export default function Home() {
  const [password, setPassword] = useState('');
  const [settings, setSettings] = useState({
    lowercase: true,
    uppercase: false,
    numbers: true,
    symbols: true,
    excludeDuplicate: false,
    spaces: false,
  });
  const [passwordLength, setPasswordLength] = useState(12);
  const [copyType, setCopyType] = useState('Copy');
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePasswordLengthChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordLength(
        event.target.value ? parseInt(event.target.value, 10) : 0,
      );
    },
    [],
  );

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));
    },
    [],
  );

  const copyToClipboard = useCallback(async () => {
    if (inputRef.current) {
      inputRef.current.select();
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopyType('Copied');
        setTimeout(() => {
          setCopyType('Copy');
        }, 2000);
      } catch (err) {
        alert('Failed to copy text');
      }
    }
  }, []);

  const generatePassword = useCallback(() => {
    const { lowercase, uppercase, numbers, symbols, excludeDuplicate, spaces } =
      settings;
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!-$*+';
    const spaceChar = ' ';

    let characters = '';
    if (lowercase) characters += lowercaseChars;
    if (uppercase) characters += uppercaseChars;
    if (numbers) characters += numberChars;
    if (symbols) characters += symbolChars;
    if (spaces) characters += spaceChar;

    if (characters === '') {
      setPassword('');
      return;
    }

    let generatorPassword = '';
    while (generatorPassword.length < passwordLength) {
      const char = getRandomCharacter(characters);
      if (excludeDuplicate && generatorPassword.includes(char)) continue;
      generatorPassword += char;
    }
    setPassword(generatorPassword);
  }, [settings, passwordLength]);

  return (
    <div className="container">
      <p>Password Generator</p>
      <div className="wrapper">
        <div className="input-box">
          <input
            ref={inputRef}
            type="text"
            name="password"
            id="password"
            value={password}
            readOnly
          />
          <span id="copy" onClick={copyToClipboard}>
            {copyType}
          </span>
        </div>
        <div className="pass-settings">
          <label className="title">Password Settings</label>
          <ul className="options">
            <li className="option">
              <input
                style={{ width: '90%', height: '20px' }}
                id="passwordLength"
                type="text"
                value={passwordLength}
                onChange={handlePasswordLengthChange}
              />
            </li>
            {[
              {
                id: 'lowercase',
                label: 'Lowercase (a-z)',
                checked: settings.lowercase,
              },
              {
                id: 'uppercase',
                label: 'Uppercase (A-Z)',
                checked: settings.uppercase,
              },
              {
                id: 'numbers',
                label: 'Numbers (0-9)',
                checked: settings.numbers,
              },
              {
                id: 'symbols',
                label: 'Symbols (!-$^+)',
                checked: settings.symbols,
              },
              {
                id: 'excludeDuplicate',
                label: 'Exclude Duplicate',
                checked: settings.excludeDuplicate,
              },
              {
                id: 'spaces',
                label: 'Include Spaces',
                checked: settings.spaces,
              },
            ].map(({ id, label, checked }) => (
              <li key={id} className="option">
                <input
                  id={id}
                  type="checkbox"
                  name={id}
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={id}>{label}</label>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="generate-btn"
          id="generate"
          onClick={generatePassword}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}
