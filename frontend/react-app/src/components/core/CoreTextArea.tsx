import React, { useId, useState } from "react";
import styled from "styled-components";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  type: string;
}

const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label<TextareaProps>`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 0.25rem;
  color: ${({ theme, type }) =>
    type === "primary" ? theme.colors.darkGrey : theme.colors.white};
`;

const Textarea = styled.textarea<TextareaProps>`
  padding: 0.75rem;
  border: 2px solid
    ${({ theme, hasError }) => (hasError ? "tomato" : theme.colors.greenDark)};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.2s, background-color 0.2s;
  font-family: ${({ theme }) => theme.fontFamily};

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.greenDark}99;
  }
`;

const RequiredMark = styled.span`
  color: tomato;
  margin-left: 0.25rem;
`;

interface CoreTextareaProps {
  label?: string;
  name: string;
  value: string;
  version?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  hasError?: boolean;
  required?: boolean;
  type: string;
}

export const CoreTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  hasError,
  required = false,
  type = "primary",
}: CoreTextareaProps) => {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const handleFocus = () => setTouched(true);

  const isEmpty = value.trim() === "";

  return (
    <FieldWrapper>
      <Label htmlFor={id} type={type}>
        {label?.toUpperCase()}
        {touched && isEmpty && required && <RequiredMark>*</RequiredMark>}
      </Label>
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        hasError={hasError}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        onBlur={handleFocus}
      />
    </FieldWrapper>
  );
};
