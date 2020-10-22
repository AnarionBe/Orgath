import React from 'react'

export const Button = ({
  className,
  onClick,
  children,
  appearance,
  size
}) => {
  return (
    <button
      className={`button ${className?className:''} ${appearance?appearance:'default'} ${size?size:'m'}`}
      onClick={typeof onClick === 'function' ? onClick : () => {}}
    >{children}</button>
  );
}