import React from 'react'

export const Button = ({className = '', onClick, children, type}) => {
  return (
    <button
      className={`button ${className} ${type}`}
      onClick={typeof onClick === 'function' ? onClick : () => {}}
    >{children}</button>
  );
}