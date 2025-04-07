import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/ContextProvider";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CoreSelect } from "../../core/CoreSelect";
import { AvfallContent } from "../../admin/avfall/AvfallContent";
import { UsersContent } from "../../admin/UsersContent";
import { AvfallPointsContent } from "../../admin/AvfallPointsContent";
import { css } from "styled-components";

const AdminContainer = css`
  width: fit-content;
  margin: 0 auto;
`;

const adminOptions = ["Avfall", "Brukere", "Avfallspunkter"];

export const AdminPage = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [adminAction, setAdminAction] = useState(adminOptions[0]);

  useEffect(() => {
    if (!user) return;
    if (!user?.isAdmin) {
      navigate("/");
      toast.error("Bruker har ikke admin-tilgang");
    }
  }, [user]);

  const getAdminActionPage = () => {
    if (adminAction === "Avfall") return <AvfallContent />;
    if (adminAction === "Brukere") return <UsersContent />;
    return <AvfallPointsContent />;
  };

  //getAllAvfallspunkter
  //getAllAvfall
  //getAllUsers

  return (
    <CoreContainer styles={AdminContainer}>
      <CoreHeading>Admin Dashbord</CoreHeading>
      <CoreSelect
        options={adminOptions}
        title="Velg adminhandling"
        value={adminAction}
        handleChange={(event) => setAdminAction(event.target.value)}
      />
      {getAdminActionPage()}
    </CoreContainer>
  );
};
