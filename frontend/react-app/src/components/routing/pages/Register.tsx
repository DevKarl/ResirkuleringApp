import { useState } from "react";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreForm } from "../../core/CoreForm";
import { CoreInput } from "../../core/CoreInput";
import { CoreButton } from "../../core/CoreButton";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO:  usePostRegister
      console.log("Form data:", formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
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
    return Object.values(newErrors).every((err) => err === "");
  };

  return (
    <CoreContainer>
      <CoreHeading>Registrer</CoreHeading>
      <CoreForm onSubmit={handleSubmit} title="Registrer en bruker hos oss">
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
          placeholder="Ditt passord"
          required
          error={errors.passord}
        />
        <CoreButton>Registrer</CoreButton>
      </CoreForm>
    </CoreContainer>
  );
};
