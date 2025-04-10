import { useEffect, useState } from "react";
import { useGetAllAvfall } from "../../../hooks/API/useGetAllAvfall";
import { CoreContainer } from "../../core/CoreContainer";
import styled, { css } from "styled-components";
import { Avfall } from "../../../types";
import { CoreButton } from "../../core/CoreButton";
import { CoreLoader } from "../../core/CoreLoader";
import { EditIcon } from "../../iconsAndLogos/EditIcon";
import { DeleteIcon } from "../../iconsAndLogos/DeleteIcon";
import { CoreInput } from "../../core/CoreInput";
import { EditAvfallModal } from "./EditAvfallModal";
import { DeleteAvfallModal } from "./DeleteAvfallModal";
import { AddNewAvfallModal } from "./AddNewAvfallModal";

const MainContainer = css`
  gap: 15px;
  border: 1px solid ${({ theme }) => theme.colors.green};
  padding: 20px;
  border-radius: 15px;
`;

const Entry = css`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.green};
  width: 100%;
  display: flex;
  border-radius: 15px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: 15px;
  margin: 10px;
  flex: 1;
`;

const ActionButtonsWrapper = css`
  flex-direction: row;
  width: 100%;
  gap: 0;
  flex: 1;
`;

const ActionButton = css`
  width: 100%;
  height: 100%;
`;

const ActionButtonContent = css`
  flex-direction: row;
  width: 100%;
  //border-top: 2px solid ${({ theme }) => theme.colors.white};
  padding: 5px 0;
`;

export const AvfallContent = () => {
  const { isLoading, data: avfallsData, getAllAvfall } = useGetAllAvfall();
  const [searchInput, setSearchInput] = useState<string>("");
  const [editAvfallModalOpen, setEditAvfallModalOpen] =
    useState<boolean>(false);
  const [addNewAvfallModalOpen, setAddNewAvfallModalOpen] =
    useState<boolean>(false);
  const [deleteAvfallModalOpen, setDeleteAvfallModalOpen] =
    useState<boolean>(false);
  const [avfallPickedForEdit, setAvfallPickedForEdit] = useState<Avfall | null>(
    null
  );
  const [avfallPickedForDeletion, setAvfallPickedForDeletion] =
    useState<Avfall | null>(null);

  useEffect(() => {
    fetchAvfall();
  }, []);

  const fetchAvfall = async () => await getAllAvfall();

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filterByName = (avfall: Avfall) => {
    const searchTerms = searchInput.trim().toLowerCase().split(" ");
    const searchEntries = [avfall?.navn];
    return searchTerms.every((term) =>
      searchEntries.some((entry) =>
        entry?.trim().toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const getFilteredAvfall = () => {
    return avfallsData?.avfall?.filter((avfall: Avfall) =>
      filterByName(avfall)
    );
  };

  const handleEditAvfall = (avfall: Avfall) => {
    setAvfallPickedForEdit(avfall);
    setEditAvfallModalOpen(true);
  };

  const handleDeleteAvfall = (avfall: Avfall) => {
    setAvfallPickedForDeletion(avfall);
    setDeleteAvfallModalOpen(true);
  };

  return (
    <CoreContainer styles={MainContainer}>
      {isLoading ? (
        <CoreLoader />
      ) : (
        <>
          <CoreButton onClick={() => setAddNewAvfallModalOpen(true)}>
            + Legg til nytt avfall
          </CoreButton>
          <CoreInput
            name="avfall"
            type="text"
            version="secondary"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Søk etter avfallet"
          />
          {getFilteredAvfall()?.map((avfall: Avfall) => (
            <CoreContainer key={avfall.id} styles={Entry}>
              <Title>{avfall?.navn}</Title>
              <CoreContainer styles={ActionButtonsWrapper}>
                <CoreButton
                  styles={ActionButton}
                  onClick={() => handleEditAvfall(avfall)}
                >
                  <CoreContainer styles={ActionButtonContent}>
                    <EditIcon />
                  </CoreContainer>
                </CoreButton>
                <CoreButton
                  styles={ActionButton}
                  onClick={() => handleDeleteAvfall(avfall)}
                >
                  <CoreContainer styles={ActionButtonContent}>
                    <DeleteIcon />
                  </CoreContainer>
                </CoreButton>
              </CoreContainer>
            </CoreContainer>
          ))}
        </>
      )}
      {editAvfallModalOpen && (
        <EditAvfallModal
          toggleModal={() => setEditAvfallModalOpen(false)}
          fetchAvfall={fetchAvfall}
          avfall={avfallPickedForEdit}
        />
      )}
      {deleteAvfallModalOpen && (
        <DeleteAvfallModal
          avfall={avfallPickedForDeletion}
          fetchAvfall={fetchAvfall}
          toggleModal={() => setDeleteAvfallModalOpen(false)}
        />
      )}
      {addNewAvfallModalOpen && (
        <AddNewAvfallModal
          fetchAvfall={fetchAvfall}
          toggleModal={() => setAddNewAvfallModalOpen(false)}
        />
      )}
    </CoreContainer>
  );
};
