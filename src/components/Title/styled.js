import styled from "styled-components";
import { BaseButton } from "../../styles/base";

export const TitleContainer = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 1px 1px 5px #ddd;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;

  & span {
    flex-grow: 1;
  }
`;

export const Button = styled(BaseButton)`
  margin-right: 10px;
`;
