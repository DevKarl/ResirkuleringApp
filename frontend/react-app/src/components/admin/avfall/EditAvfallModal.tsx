import { useEffect, useState } from "react";
import { Avfall, AvfallsType } from "../../../types";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreForm } from "../../core/CoreForm";
import { CoreInput } from "../../core/CoreInput";
import { CoreModal } from "../../core/CoreModal";
import { CoreSelect } from "../../core/CoreSelect";
import { CoreTextarea } from "../../core/CoreTextArea";
import { useGetAllAvfallstyper } from "../../../hooks/API/useGetAllAvfallstyper";
import { CoreLoader } from "../../core/CoreLoader";
import { ButtonType, CoreButton } from "../../core/CoreButton";
import { css } from "styled-components";

interface EditAvfallModalProps {
  avfall: Avfall | null;
  toggleModal: () => void;
  fetchAvfall: () => void;
}

const ModalStyles = css`
  height: 200px;
`;

export const EditAvfallModal = ({
  avfall,
  toggleModal,
  fetchAvfall,
}: EditAvfallModalProps) => {
  // API get all avfallstyper  --> set i  SELECT
  const {
    isLoading: loadingAvfallsTyper,
    data: avfallsTyperData,
    getAllAvfallstyper,
  } = useGetAllAvfallstyper();

  useEffect(() => {
    getAllAvfallstyper();
  }, []);

  const [formData, setFormData] = useState({
    id: avfall?.id || 0,
    navn: avfall?.navn || "",
    beskrivelse: avfall?.beskrivelse || "",
    avfallsType: avfall?.avfallsType.type || "",
    strekKode: avfall?.strekKode || "",
  });

  const [errors, setErrors] = useState({
    navn: false,
    beskrivelse: false,
    avfallsType: false,
    strekKode: false,
  });

  const avfallsTyperOptions =
    avfallsTyperData?.avfallsTyper.map(
      (avfallsType: AvfallsType) => avfallsType.type
    ) || [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, avfallsType: value }));
  };

  const handleSubmit = () => {
    toggleModal();
    fetchAvfall();
  };

  return (
    <CoreModal onClose={toggleModal} styles={ModalStyles}>
      <CoreContainer>
        <CoreForm onSubmit={handleSubmit} title="Endre avfall" type="secondary">
          <CoreInput
            value={formData.navn}
            onChange={handleChange}
            label="Navn"
            name="navn"
            placeholder="Kort navn for avfallet"
            required
            hasError={errors.navn}
            version="secondary"
          />
          <CoreTextarea
            value={formData.beskrivelse}
            onChange={handleChange}
            label="Beskrivelse"
            name="beskrivelse"
            placeholder="Lengre beskrivelse av avfallet"
            required
            type="secondary"
            hasError={errors.beskrivelse}
          />
          {loadingAvfallsTyper ? (
            <CoreLoader secondary />
          ) : (
            <CoreSelect
              titleSmall="Avfallstype"
              version="secondary"
              fontSize="1rem"
              options={avfallsTyperOptions}
              handleChange={handleSelectChange}
              value={formData?.avfallsType || ""}
            />
          )}
          <CoreInput
            value={formData.strekKode}
            version="secondary"
            onChange={handleChange}
            label="Strekkode"
            name="strekKode"
            placeholder="Strekkoden til avfallet"
            required
            hasError={errors.strekKode}
          />
          <CoreButton type={ButtonType.White}>Lagre</CoreButton>
        </CoreForm>
      </CoreContainer>
    </CoreModal>
  );
};
