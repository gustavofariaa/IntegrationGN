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
      font-size: calc(3rem + 1.5vw);
    }
    & > h2 {
      font-size: calc(1rem + .9vw);
    }
  }
`;

export const Payment = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  justify-content: space-around;

  & > .card {
    height: max-content;
  }
`;

export const PaymentDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;
