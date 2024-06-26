import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
`;

export const Page = styled.div`
  cursor: pointer;

  &:hover {
    color: #21a6b7;
  }

  &.active {
    color: #009387;
    font-weight: bold;
  }
`;
