import { useState } from "react";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreForm } from "../../core/CoreForm";
import { CoreInput } from "../../core/CoreInput";
import { CoreButton } from "../../core/CoreButton";
import { usePostRegister } from "../../API/usePostRegister";
import { CoreLoader } from "../../core/CoreLoader";
import styled from "styled-components";

const ErrorText = styled.p`
  font-size: 1.5rem;
  color: red;
`;

const SucessText = styled.p`
  font-size: 1.5rem;
  color: green;
`;

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
      <CoreHeading>Registrer</CoreHeading>
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
