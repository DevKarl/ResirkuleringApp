import { useEffect, useState } from "react";
import InputField from "../../core/Input";
import { Button } from "../../core/Button";
import { FormContainer } from "../../core/Form";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { CoreLink } from "../../core/CoreLink";
import { useAppContext } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({ brukernavn: "", passord: "" });
  const [errors, setErrors] = useState({
    brukernavn: "",
    passord: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO:  usePostLogin
      console.log("Form data:", formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    // SETT ERRORS I FØLGE BACKEND RESPONSE HER:

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
        <CoreLink to="/registrer">
          Mangler du konto? Klikk her for å registrere
        </CoreLink>
      </FormContainer>
    </CoreContainer>
  );
};
