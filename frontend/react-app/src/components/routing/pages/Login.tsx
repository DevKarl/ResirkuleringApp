import { useEffect, useState } from "react";
import { CoreInput } from "../../core/CoreInput";
import { CoreButton } from "../../core/CoreButton";
import { CoreForm } from "../../core/CoreForm";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreLink } from "../../core/CoreLink";
import { useAppContext } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { usePostLogin } from "../../../hooks/API/usePostLogin";
import styled from "styled-components";
import { CoreLoader } from "../../core/CoreLoader";

const ErrorText = styled.p`
  font-size: 1.5rem;
  color: red;
`;

export const Login = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const { isLoading, error, postLogin } = usePostLogin();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({ brukernavn: "", passord: "" });
  const [errors, setErrors] = useState({
    brukernavn: "",
    passord: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      postLogin(formData);
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
    <CoreContainer>
      <CoreHeading>Logg inn</CoreHeading>
      {error && <ErrorText>{error}</ErrorText>}
      <CoreForm onSubmit={handleSubmit} title="Logg inn på brukerkontoen din">
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
        {isLoading ? <CoreLoader /> : <CoreButton>Logg inn</CoreButton>}
        <CoreLink to="/registrer">
          Mangler du konto? Klikk her for å registrere
        </CoreLink>
      </CoreForm>
    </CoreContainer>
  );
};
