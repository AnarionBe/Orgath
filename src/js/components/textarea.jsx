import React from 'react'

export const Textarea =  ({
  className,
  label,
  onChange,
  value,
  placeholder
}) => {
  return (
    <div className={`textarea ${className}`}>
      <label>{label}</label>
      <textarea
        className="textarea__field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}