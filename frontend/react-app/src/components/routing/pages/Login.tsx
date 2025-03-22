import { useState } from "react";
import styled from "styled-components";
import InputField from "../../core/Input";
import { Button } from "../../core/Button";
import { FormContainer } from "../../core/Form";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.greenDark};
  font-family: Arial, sans-serif;
  text-align: center;
`;

const StyledLink = styled(Link)<{ color?: string }>`
  text-decoration: underline;
  color: ${({ theme, color }) => color || theme.colors.greenDark};
  font-weight: 500;
  transition: color 0.3s ease;

  /* &:hover {
    color: ${({ theme }) => theme.colors.darkGrey};
  } */
`;

export const Login = () => {
  const [formData, setFormData] = useState({ brukernavn: "", passord: "" });
  const [errors, setErrors] = useState({
    brukernavn: "",
    passord: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // alert('Form submitted!');
      console.log("Form data:", formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: typeof errors = { brukernavn: "", passord: "" };
    if (formData.brukernavn.length < 3) {
      newErrors.brukernavn = "Brukernavn må være minst 3 tegn";
    }
    if (formData.passord.length < 3) {
      newErrors.passord = "Passord må være minst 3 tegn";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  return (
    <Container>
      <Heading>Logg inn</Heading>
      <FormContainer
        onSubmit={handleSubmit}
        title="Logg inn på brukerkontoen din"
      >
        <InputField
          value={formData.brukernavn}
          onChange={handleChange}
          label="Brukernavn"
          name="brukernavn"
          placeholder="Ditt brukernavn"
          required
          error={errors.brukernavn}
        />
        <InputField
          value={formData.passord}
          onChange={handleChange}
          label="Passord"
          name="passord"
          placeholder="Ditt passord"
          required
          error={errors.passord}
        />
        <Button>Logg inn</Button>
        <StyledLink to="/registrer">
          Mangler du konto? Klikk her for å registrere
        </StyledLink>
      </FormContainer>
    </Container>
  );
};
