import styled, { css } from 'styled-components';

export const Item = styled.div`
  ${({ width }) => css`
    min-width: ${width}px;
    transition: all .2s;

    & > img {
      padding: 32px;
      padding-bottom: 4px;
    }

    & > .card-body {
      & > .text-secondary {
        font-size: 14px;
      }
      & > .card-title {
        font-size: 14px;
        color: black;
      }
    }
    &:hover {
      cursor: pointer;
      box-shadow: 0 1rem 3rem rgba(0,0,0,.1);
      background-color: white;
      transform: scale(1.01);
    }
  `}
`;
