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
import { CoreLoader } from "../../core/CoreLoader";
import { toast } from "sonner";
import { css } from "styled-components";

const LoginContainer = css`
  gap: 15px;
  width: 100%;
`;

export const Login = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const { isLoading, postLogin } = usePostLogin();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({ brukernavn: "", passord: "" });
  const [errors, setErrors] = useState({
    brukernavn: false,
    passord: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      postLogin(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    const newErrors = { brukernavn: false, passord: false };
    if (formData.brukernavn.trim().length < 3) {
      newErrors.brukernavn = true;
      toast.error("Brukernavn må være minst 3 tegn");
    }
    if (formData.passord.trim().length < 3) {
      newErrors.passord = true;
      toast.error("Passord må være minst 3 tegn");
    }
    setErrors(newErrors);
    return newErrors.brukernavn === false && newErrors.passord === false;
  };

  return (
    <CoreContainer>
      <CoreHeading>Logg inn</CoreHeading>
      <CoreForm onSubmit={handleSubmit} title="Logg inn på brukerkontoen din">
        <CoreContainer styles={LoginContainer}>
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
            placeholder="Ditt passord"
            required
            hasError={errors.passord}
            type="password"
          />
          {isLoading ? <CoreLoader /> : <CoreButton>Logg inn</CoreButton>}
          <CoreLink to="/registrer">
            Mangler du konto? Klikk her for å registrere
          </CoreLink>
        </CoreContainer>
      </CoreForm>
    </CoreContainer>
  );
};
