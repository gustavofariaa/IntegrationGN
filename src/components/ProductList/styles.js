import styled, { css } from 'styled-components';

export const Home = styled.div`
`;

export const ProductsList = styled.div`
  ${({ itemWidth }) => css`
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(${itemWidth}px, 1fr));
  `}
`;

export const Carousel = styled.div`
  overflow: hidden;
`;
