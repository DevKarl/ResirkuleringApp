import { useState } from "react";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreForm } from "../../core/CoreForm";
import { CoreInput } from "../../core/CoreInput";
import { CoreButton } from "../../core/CoreButton";
import { usePostRegister } from "../../API/usePostRegister";
import { CoreLoader } from "../../core/CoreLoader";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../core/theme/theme";

const ErrorText = styled.p`
  font-size: 1.5rem;
  color: red;
`;

const SucessText = styled.p`
  font-size: 1.5rem;
  color: green;
`;

const HeaderContainerStyles = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
`;

// const NavigateBack = () => {
//   return (
//     <Link
//       to="/logginn"
//       style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         viewBox="0 0 512 512"
//         style={{ width: "40px", height: "40px", marginRight: "8px" }}
//       >
//         <polygon
//           points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256"
//           fill=""
//         />
//       </svg>
//     </Link>
//   );
// };

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  border: 2px solid ${(props) => props.theme.colors.greenDark};
  border-radius: 15%;
  &:hover {
    opacity: 0.8; /* Optional hover effect */
  }
`;

const StyledSVG = styled.svg`
  width: 40px;
  height: 40px;
  margin-right: 3px;
  polygon {
    fill: ${(props) => props.theme.colors.greenDark}; /* Use theme color */
    transition: fill 0.2s ease-in-out; /* Smooth transition for hover effect */
  }
  &:hover polygon {
    fill: ${(props) => props.theme.colors.greenBright}; /* Hover color */
  }
`;

const NavigateBack: React.FC = () => {
  return (
    <StyledLink to="/logginn">
      <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256" />
      </StyledSVG>
    </StyledLink>
  );
};

export const Registrer = () => {
  const [formData, setFormData] = useState({
    fornavn: "",
    etternavn: "",
    brukernavn: "",
    passord: "",
  });
  const [errors, setErrors] = useState({
    fornavn: "",
    etternavn: "",
    brukernavn: "",
    passord: "",
  });

  const { isLoading, error, successResponse, postRegister } = usePostRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasErrors()) {
      postRegister(formData);
      console.log("Form data:", formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasErrors = (): boolean => {
    const newErrors: typeof errors = {
      fornavn: "",
      etternavn: "",
      brukernavn: "",
      passord: "",
    };
    if (formData.fornavn.length < 3) {
      newErrors.brukernavn = "Brukernavn må være minst 6 tegn";
    }
    if (formData.etternavn.length < 3) {
      newErrors.brukernavn = "Brukernavn må være minst 6 tegn";
    }
    if (formData.brukernavn.length < 3) {
      newErrors.brukernavn = "Brukernavn må være minst 6 tegn";
    }
    if (formData.passord.length < 3) {
      newErrors.passord = "Passord må være minst 3 tegn";
    }
    setErrors(newErrors);
    return Object.values(newErrors).some((item) => item.trim().length > 0);
  };

  return (
    <CoreContainer>
      <CoreContainer styles={HeaderContainerStyles}>
        <NavigateBack />
        <CoreHeading>Registrer</CoreHeading>
      </CoreContainer>
      <CoreForm onSubmit={handleSubmit} title="Registrer en bruker hos oss">
        {error && <ErrorText>{error}</ErrorText>}
        {successResponse && <SucessText>{successResponse}</SucessText>}
        <CoreInput
          value={formData.fornavn}
          onChange={handleChange}
          label="Fornavn"
          name="fornavn"
          placeholder="Ditt fornavn"
          required
          error={errors.fornavn}
        />
        <CoreInput
          value={formData.etternavn}
          onChange={handleChange}
          label="Etternavn"
          name="etternavn"
          placeholder="Ditt etternavn"
          required
          error={errors.etternavn}
        />
        <CoreInput
          value={formData.brukernavn}
          onChange={handleChange}
          label="Brukernavn"
          name="brukernavn"
          placeholder="Ditt brukernavn"
          required
          error={errors.brukernavn}
        />
        <CoreInput
          value={formData.passord}
          onChange={handleChange}
          label="Passord"
          name="passord"
          type="password"
          placeholder="Ditt passord"
          required
          error={errors.passord}
        />
        {isLoading ? <CoreLoader /> : <CoreButton>Registrer</CoreButton>}
      </CoreForm>
    </CoreContainer>
  );
};
