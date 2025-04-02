import { useNavigate } from "react-router-dom";
import { GivenWarnings, useAppContext } from "../../../context/ContextProvider";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreHeading } from "../../core/CoreHeading";
import { toast } from "sonner";
import { useRef, useState } from "react";

export const AdminPage = () => {
  const { user, givenWarnings, setGivenWarnings } = useAppContext();
  console.log({ givenWarnings });
  const navigate = useNavigate();
  if (!user?.isAdmin) {
    navigate("/");
    if (givenWarnings) return;
    setGivenWarnings((prev) => ({ ...prev, admin: true }));
    toast.error("Bruker har ikke admin-tilgang");
  }

  return (
    <CoreContainer>
      <CoreHeading>Admin Dashbord</CoreHeading>
    </CoreContainer>
  );
};
