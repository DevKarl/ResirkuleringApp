import styled, { keyframes } from "styled-components";

// Skeleton animation
const skeletonAnimation = keyframes`
  0% {
    background-color: #e0e0e0; // Light gray
  }
  50% {
    background-color: #f5f5f5; // Very light gray
  }
  100% {
    background-color: #e0e0e0; // Back to light gray
  }
`;

// Styled container for skeleton loader
const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px; // Matches map's height
  width: 100%; // Matches map's width
  border-radius: 8px;
  background-color: #f9f9f9;
`;

// Styled skeleton placeholder
const SkeletonBox = styled.div`
  width: 90%;
  height: 50px;
  margin: 8px 0;
  border-radius: 8px;
  animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
`;

const MessageP = styled.p`
  font-size: 25px;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
`;

// Loader component
const MapLoader = () => {
  return (
    <LoaderContainer>
      <MessageP>Laster inn posisjonen din ...</MessageP>
      <SkeletonBox /> {/* Placeholder for first line */}
      <SkeletonBox /> {/* Placeholder for second line */}
      <SkeletonBox /> {/* Placeholder for third line */}
    </LoaderContainer>
  );
};

export default MapLoader;
