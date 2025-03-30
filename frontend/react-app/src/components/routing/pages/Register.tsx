import { useState } from "react";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreForm } from "../../core/CoreForm";
import { CoreInput } from "../../core/CoreInput";
import { CoreButton } from "../../core/CoreButton";
import { usePostRegister } from "../../../hooks/API/usePostRegister";
import { CoreLoader } from "../../core/CoreLoader";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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
    fornavn: false,
    etternavn: false,
    brukernavn: false,
    passord: false,
  });

  const { isLoading, postRegister } = usePostRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasErrors()) {
      postRegister(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasErrors = (): boolean => {
    const newErrors = {
      fornavn: false,
      etternavn: false,
      brukernavn: false,
      passord: false,
    };
    if (
      formData.fornavn.trim().length < 1 ||
      formData.fornavn.trim().length > 20
    ) {
      newErrors.fornavn = true;
      toast.error("Fornavn må være mellom 1 og 20 tegn");
    }
    if (
      formData.etternavn.trim().length < 1 ||
      formData.etternavn.trim().length > 20
    ) {
      newErrors.etternavn = true;
      toast.error("Etternavn må være mellom 1 og 20 tegn");
    }
    if (
      formData.brukernavn.trim().length < 5 ||
      formData.brukernavn.trim().length > 20
    ) {
      newErrors.brukernavn = true;
      toast.error("Brukernavn må være mellom 5 og 20 tegn");
    }
    if (
      formData.passord.trim().length < 5 ||
      formData.passord.trim().length > 20
    ) {
      newErrors.passord = true;
      toast.error("Passord må være mellom 5 og 20 tegn");
    }
    setErrors(newErrors);
    return (
      newErrors.brukernavn === false &&
      newErrors.passord === false &&
      newErrors.fornavn === false &&
      newErrors.etternavn === false
    );
  };

  return (
    <CoreContainer>
      <CoreContainer styles={HeaderContainerStyles}>
        <NavigateBack />
        <CoreHeading>Registrer</CoreHeading>
      </CoreContainer>
      <CoreForm onSubmit={handleSubmit} title="Registrer en bruker hos oss">
        <CoreInput
          value={formData.fornavn}
          onChange={handleChange}
          label="Fornavn"
          name="fornavn"
          placeholder="Ditt fornavn"
          required
          hasError={errors.fornavn}
        />
        <CoreInput
          value={formData.etternavn}
          onChange={handleChange}
          label="Etternavn"
          name="etternavn"
          placeholder="Ditt etternavn"
          required
          hasError={errors.etternavn}
        />
        <CoreInput
          value={formData.brukernavn}
          onChange={handleChange}
          label="Brukernavn"
          name="brukernavn"
          placeholder="Ditt brukernavn"
          required
          hasError={errors.brukernavn}
        />
        <CoreInput
          value={formData.passord}
          onChange={handleChange}
          label="Passord"
          name="passord"
          type="password"
          placeholder="Ditt passord"
          required
          hasError={errors.passord}
        />
        {isLoading ? <CoreLoader /> : <CoreButton>Registrer</CoreButton>}
      </CoreForm>
    </CoreContainer>
  );
};
