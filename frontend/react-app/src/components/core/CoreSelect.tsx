import styled, { css } from "styled-components";
import { CoreContainer } from "./CoreContainer";

interface CoreSelectProps {
  options: string[];
  value: string;
  title?: string;
  version?: "primary" | "secondary";
  titleSmall?: string;
  fontSize?: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface FontSizeProps {
  fontSize: string;
}

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.greenDark};
  align-self: center;
  font-size: 25px;
`;

const Select = styled.select<FontSizeProps>`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.greenWhiteHover};
  border-radius: 10px;
  font-size: ${({ fontSize }) => fontSize};
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.greenDark};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #888;
  }
`;

const Option = styled.option<FontSizeProps>`
  font-size: ${({ fontSize }) => fontSize};
`;

const Container = css`
  flex-direction: column;
  gap: 0;
  align-items: start;
  width: 100%;
`;

interface TitleSmallProps {
  version?: "primary" | "secondary";
}

const TitleSmall = styled.p<TitleSmallProps>`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 0.25rem;
  text-align: start;
  color: ${({ theme, version }) =>
    version === "primary" ? theme.colors.darkGrey : theme.colors.white};
`;

export const CoreSelect = ({
  options,
  value,
  title,
  titleSmall,
  fontSize = "20px",
  version = "primary",
  handleChange,
}: CoreSelectProps) => {
  return (
    <CoreContainer styles={Container}>
      {title && <Title>{title}</Title>}
      {titleSmall && (
        <TitleSmall version={version}>{titleSmall?.toUpperCase()}</TitleSmall>
      )}
      <Select value={value} onChange={handleChange} fontSize={fontSize}>
        {options.map((opt) => (
          <Option key={opt} value={opt} fontSize={fontSize}>
            {opt}
          </Option>
        ))}
      </Select>
    </CoreContainer>
  );
};
