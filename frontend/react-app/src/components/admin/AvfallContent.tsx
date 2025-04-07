import { useEffect, useState } from "react";
import { useGetAllAvfall } from "../../hooks/API/useGetAllAvfall";
import { CoreContainer } from "../core/CoreContainer";
import styled, { css } from "styled-components";
import { Avfall } from "../../types";
import { CoreButton } from "../core/CoreButton";
import { CoreLoader } from "../core/CoreLoader";
import { EditIcon } from "../iconsAndLogos/EditIcon";
import { DeleteIcon } from "../iconsAndLogos/DeleteIcon";
import { CoreInput } from "../core/CoreInput";

const MainContainer = css`
  gap: 15px;
  border: 2px solid ${({ theme }) => theme.colors.white};
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
  font-size: 20px;
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
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllAvfall();
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filterByName = (avfall: Avfall) => {
    const searchTerms = searchInput.trim().toLowerCase().split(" ");
    console.log({ searchTerms });
    const searchEntries = [avfall?.navn];
    console.log({ searchEntries });
    return searchTerms.every((term) =>
      searchEntries.some((entry) =>
        entry?.trim().toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const getFilteredAvfall = () => {
    avfallsData?.avfall?.filter((avfall: Avfall) => filterByName(avfall));
  };

  console.log({ avfallsData });

  return (
    <CoreContainer styles={MainContainer}>
      {isLoading ? (
        <CoreLoader />
      ) : (
        <>
          <CoreButton>+ Legg til nytt avfall</CoreButton>
          <CoreInput
            name="users"
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
                <CoreButton styles={ActionButton}>
                  <CoreContainer styles={ActionButtonContent}>
                    <EditIcon />
                  </CoreContainer>
                </CoreButton>
                <CoreButton styles={ActionButton}>
                  <CoreContainer styles={ActionButtonContent}>
                    <DeleteIcon />
                  </CoreContainer>
                </CoreButton>
              </CoreContainer>
            </CoreContainer>
          ))}
        </>
      )}
    </CoreContainer>
  );
};
