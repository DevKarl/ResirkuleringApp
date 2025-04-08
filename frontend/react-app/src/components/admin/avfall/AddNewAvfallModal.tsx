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
import { toast } from "sonner";
import { usePostAddNewAvfall } from "../../../hooks/API/usePostAddNewAvfall";

interface AddNewAvfallModalProps {
  toggleModal: () => void;
  fetchAvfall: () => void;
}

const ModalStyles = css`
  height: 200px;
`;

export const AddNewAvfallModal = ({
  toggleModal,
  fetchAvfall,
}: AddNewAvfallModalProps) => {
  const {
    isLoading: loadingAvfallsTyper,
    data: avfallsTyperData,
    getAllAvfallstyper,
  } = useGetAllAvfallstyper();

  const { isLoading: loadingPostingNewAvfall, postAddNewAvfall } =
    usePostAddNewAvfall();

  useEffect(() => {
    getAllAvfallstyper();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      avfallsType: avfallsTyperData?.avfallsTyper[0].type || "",
    }));
  }, [avfallsTyperData]);

  const [formData, setFormData] = useState({
    navn: "",
    beskrivelse: "",
    avfallsType: "",
    strekKode: "",
  });

  const [errors, setErrors] = useState({
    navn: false,
    beskrivelse: false,
    avfallsType: false,
    strekKode: false,
  });

  const isValid = (): boolean => {
    const newErrors = {
      navn: false,
      beskrivelse: false,
      avfallsType: false,
      strekKode: false,
    };
    if (formData.navn.trim().length < 1 || formData.navn.trim().length > 20) {
      newErrors.navn = true;
      toast.error("Navnet på avfallet må være mellom 1 og 20 tegn");
    }
    if (
      formData.beskrivelse.trim().length < 1 ||
      formData.beskrivelse.trim().length > 200
    ) {
      newErrors.beskrivelse = true;
      toast.error("Beskrivelsen må være mellom 1 og 200 tegn");
    }
    if (!formData.avfallsType) {
      newErrors.avfallsType = true;
      toast.error("Avfallstype må oppgis");
    }
    if (
      formData.strekKode.trim().length < 5 ||
      formData.strekKode.trim().length > 30
    ) {
      newErrors.strekKode = true;
      toast.error("Strekkoden må være mellom 5 og 30 tegn");
    }
    setErrors(newErrors);
    return (
      newErrors.navn === false &&
      newErrors.beskrivelse === false &&
      newErrors.avfallsType === false &&
      newErrors.strekKode === false
    );
  };

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

  const getIdForAvfallsType = () => {
    return avfallsTyperData?.avfallsTyper.find(
      (avfallsType: any) =>
        avfallsType.type.toLowerCase() ===
        formData.avfallsType.toLocaleLowerCase()
    ).id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isValid()) {
      await postAddNewAvfall({
        navn: formData.navn,
        beskrivelse: formData.beskrivelse,
        avfallsTypeId: getIdForAvfallsType(),
        strekkode: formData.strekKode,
      });
      toggleModal();
      fetchAvfall();
    }
  };

  return (
    <CoreModal onClose={toggleModal} styles={ModalStyles}>
      <CoreContainer>
        <CoreForm
          onSubmit={handleSubmit}
          title="Legg til nytt avfall"
          type="secondary"
        >
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
              value={formData.avfallsType}
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
          {loadingPostingNewAvfall ? (
            <CoreLoader secondary />
          ) : (
            <CoreButton type={ButtonType.White}>Legg til</CoreButton>
          )}
        </CoreForm>
      </CoreContainer>
    </CoreModal>
  );
};
