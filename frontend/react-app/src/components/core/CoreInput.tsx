import React, { useId, useState } from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  version?: string;
}

const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label<InputProps>`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 0.25rem;
  color: ${({ theme, version }) =>
    version === "primary" ? theme.colors.darkGrey : theme.colors.white};
`;

const Input = styled.input<InputProps>`
  height: 45px;
  padding: 0rem 0.75rem;
  border: 2px solid
    ${({ theme, hasError }) => (hasError ? "tomato" : theme.colors.greenDark)};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 1rem;
  transition: border-color 0.2s, background-color 0.2s;

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.greenDark}99;
  }
`;

const ErrorMessage = styled.p`
  color: tomato;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const RequiredMark = styled.span`
  color: tomato;
  margin-left: 0.25rem;
`;

interface CoreInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  version?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const CoreInput = ({
  label,
  name,
  type = "text",
  version = "primary",
  value,
  onChange,
  placeholder,
  error,
  required = false,
}: CoreInputProps) => {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const handleFocus = () => {
    setTouched(true);
  };

  const isEmpty = value.trim() === "";

  return (
    <FieldWrapper>
      <Label htmlFor={id} version={version}>
        {label.toUpperCase()}
        {touched && isEmpty && required && <RequiredMark>*</RequiredMark>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        hasError={!!error}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={handleFocus}
      />
      {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
    </FieldWrapper>
  );
};
