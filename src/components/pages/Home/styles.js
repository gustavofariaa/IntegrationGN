import styled from 'styled-components';

export const Home = styled.div`
`;

export const Banner = styled.h3`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ProductsList = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
`;

export const Carousel = styled.div`
  overflow: hidden;
`;
