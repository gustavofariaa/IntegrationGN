import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;

  & > .wrapper {
    margin-top: -128px;
    & > h1 {
      font-weight: bold;
      font-size: calc(4.375rem + 1.5vw);
    }
    & > h2 {
      font-size: calc(1rem + .9vw);
    }
  }
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-around;

  & > .product-presentation {
    display: flex;
    flex-direction: row;
    algin-items: flex-start;
    justify-content: flex-start;

    img { 
      width: 50%;
      object-fit: contain;
    }

    & > .product-description {
      width: 50%;
      & > p {
        font-size: .9rem;
      }
    }
  }

  & > .product-order {
    height: max-content;

    & > .product-price {
      & > p {
        font-size: .8rem;
        
        &.payment-details {
          cursor: pointer;
          width: 96px;
          text-decoration: underline;
        }
      }

    }
  }
`;
