'use client';

import { useCallback, useRef, useState } from 'react';
import getRandomCharacter from '@/utils/generatorPassword';
export default function Home() {
  const [password, setPassword] = useState('');
  const [lowercaseIsChecked, setLowercaseIsChecked] = useState(true);
  const [uppercaseIsChecked, setUppercaseIsChecked] = useState(false);
  const [numbersIsChecked, setNumbersIsChecked] = useState(true);
  const [symbolsIsChecked, setSymbolsIsChecked] = useState(true);
  const [excDuplicateIsChecked, setExcDuplicateIsChecked] = useState(false);
  const [spacesIsChecked, setSpacesIsChecked] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);
  const [copyType, setCopyType] = useState('Copy');
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePasswordLengthChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === '') {
        setPasswordLength(0);
      } else {
        setPasswordLength(parseInt(event.target.value, 10));
      }
    },
    [],
  );

  const handleLowercaseChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLowercaseIsChecked(event.target.checked);
    },
    [],
  );

  const handleUppercaseChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUppercaseIsChecked(event.target.checked);
    },
    [],
  );

  const handleNumbersChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNumbersIsChecked(event.target.checked);
    },
    [],
  );

  const handleSymbolsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSymbolsIsChecked(event.target.checked);
    },
    [],
  );

  const handleExcDuplicateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setExcDuplicateIsChecked(event.target.checked);
    },
    [],
  );

  const handleSpacesChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSpacesIsChecked(event.target.checked);
    },
    [],
  );

  const copyToClipboard = useCallback(async () => {
    debugger;
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
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!-$*+';
    const spaceChar = ' ';

    let characters = '';
    if (lowercaseIsChecked) characters += lowercaseChars;
    if (uppercaseIsChecked) characters += uppercaseChars;
    if (numbersIsChecked) characters += numberChars;
    if (symbolsIsChecked) characters += symbolChars;
    if (spacesIsChecked) characters += spaceChar;

    if (characters === '') {
      setPassword('');
      return;
    }

    let generatorPassword = '';
    while (generatorPassword.length < passwordLength) {
      let char = getRandomCharacter(characters);
      if (excDuplicateIsChecked && generatorPassword.includes(char)) continue;
      generatorPassword += char;
    }
    setPassword(generatorPassword);
  }, [
    lowercaseIsChecked,
    uppercaseIsChecked,
    numbersIsChecked,
    symbolsIsChecked,
    excDuplicateIsChecked,
    spacesIsChecked,
    passwordLength,
  ]);

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
            readOnly={true}
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
            <li className="option">
              <input
                id="lowercase"
                type="checkbox"
                checked={lowercaseIsChecked}
                onChange={handleLowercaseChange}
              />
              <label htmlFor="lowercase">Lowercase (a-z)</label>
            </li>
            <li className="option">
              <input
                id="uppercase"
                type="checkbox"
                checked={uppercaseIsChecked}
                onChange={handleUppercaseChange}
              />
              <label htmlFor="uppercase">Uppercase (A-Z)</label>
            </li>
            <li className="option">
              <input
                id="numbers"
                type="checkbox"
                checked={numbersIsChecked}
                onChange={handleNumbersChange}
              />
              <label htmlFor="numbers">Numbers (0-9)</label>
            </li>
            <li className="option">
              <input
                id="symbols"
                type="checkbox"
                checked={symbolsIsChecked}
                onChange={handleSymbolsChange}
              />
              <label htmlFor="symbols">Symbols (!-$^+)</label>
            </li>
            <li className="option">
              <input
                id="exc-duplicate"
                type="checkbox"
                checked={excDuplicateIsChecked}
                onChange={handleExcDuplicateChange}
              />
              <label htmlFor="exc-duplicate">Exclude Duplicate</label>
            </li>
            <li className="option">
              <input
                id="spaces"
                type="checkbox"
                checked={spacesIsChecked}
                onChange={handleSpacesChange}
              />
              <label htmlFor="spaces">Include Spaces</label>
            </li>
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
