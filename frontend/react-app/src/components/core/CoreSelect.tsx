import styled, { css } from "styled-components";
import { CoreContainer } from "./CoreContainer";

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.greenDark};
  font-size: 25px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.greenWhiteHover};
  border-radius: 10px;
  font-size: 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.greenDark};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #888;
  }
`;

const Option = styled.option`
  font-size: 20px;
`;

const Container = css`
  flex-direction: column;
  gap: 0;
`;

interface CoreSelectProps {
  options: string[];
  value: string;
  title: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CoreSelect = ({
  options,
  value,
  title,
  handleChange,
}: CoreSelectProps) => {
  return (
    <CoreContainer styles={Container}>
      <Title>{title}</Title>
      <Select value={value} onChange={handleChange}>
        {options.map((opt) => (
          <Option key={opt} value={opt}>
            {opt}
          </Option>
        ))}
      </Select>
    </CoreContainer>
  );
};
