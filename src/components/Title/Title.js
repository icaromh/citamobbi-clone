import React from "react";
import * as S from "./styled";

const Title = props => (
  <S.TitleContainer>
    <S.Button onClick={props.onClear}>
      <span role="img" aria-label="emoji seta voltar">
        🔙
      </span>
    </S.Button>

    <span>
      {props.isLoading ? "⌛" : <b>{props.data.routeCode}</b>}
      {` - ${props.data.serviceMnemonic}`}
    </span>
  </S.TitleContainer>
);

export default Title;
