import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/ContextProvider";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { toast } from "sonner";
import { useState } from "react";
import { CoreSelect } from "../../core/CoreSelect";

const adminOptions = ["Avfall", "Brukere", "Tilganger"];

export const AdminPage = () => {
  //const { user } = useAppContext();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(adminOptions[0]);

  const user = {
    isAdmin: true,
  };

  if (!user?.isAdmin) {
    navigate("/");
    toast.error("Bruker har ikke admin-tilgang");
  }

  return (
    <CoreContainer>
      <CoreHeading>Admin Dashbord</CoreHeading>
      <CoreSelect
        options={adminOptions}
        title="Velg adminhandling"
        value={selected}
        handleChange={(event) => setSelected(event.target.value)}
      />
    </CoreContainer>
  );
};
