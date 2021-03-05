import styled from 'styled-components';

export const CartButton = styled.button`
  position: relative;
  width: 56px;
  height: 48px;
  overflow: visible;

  & > .badget {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px !important;
    height: 24px !important;
    border-radius: 50%;
    background-color: white;
    font-weight: bold;
    color: black;
  }

  & > .cart-tooltip {
    position: absolute;
    width: 160px;
    bottom: -88px;
    right: 0;

    &::after {
      content: "";
      position: absolute;
      top: -6px;
      right: 18px;
      width: 16px;
      height: 16px;
      transform: rotate(45deg);
      background-color: white;
      border-radius: 0.25rem;
    }
  }
`;
