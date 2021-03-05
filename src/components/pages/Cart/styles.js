import styled from 'styled-components';

export const Cart = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  justify-content: space-around;

  & > .card {
    height: max-content;
  }
`;

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
      font-size: calc(3rem + 1.5vw);
    }
    & > h2 {
      font-size: calc(1rem + .9vw);
    }
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;

  & > img {
    width: 96px;
    height: 96px;
  }

  & > .wrapper-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`;

export const PaymentDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;
