import React from 'react';

export default function PasswordPolicy () {
  return (
    <div>
      <h4>Your password should contain: </h4>
      <ul>
        <li>Minimum length of 8 characters</li>
        <li>Numerical characters (0-9)</li>
        <li>Special characters</li>
        <li>Uppercase letter</li>
        <li>Lowercase letter</li>
      </ul>
    </div>
  )
}

