import styled from 'styled-components';

export const Club = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.h3`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: max-content;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  & > .card {
    height: max-content;
  }
`;
