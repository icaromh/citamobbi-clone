import styled from "styled-components";

export const BaseButton = styled.button`
  color: #222;
  background-color: var(--color-primary);

  font-size: 14px;
  height: 35px;

  border-radius: 5px;
  border: 0;

  &:hover {
    cursor: pointer;
  }
`;
