import React from "react";

import * as S from "./styled";

const SearchResult = ({ data, handleSelectService }) => (
  <S.SearchResultContainer>
    {(data.services.length === 0 && (
      <S.EmptyResultList>
        Nenhum linha encontrada. Tente outro nome
      </S.EmptyResultList>
    )) || (
      <S.SearchResultList>
        {data.services.map(service => (
          <S.SearchResultItem
            key={service.id}
            onClick={() => handleSelectService(service)}
          >
            <b>{service.routeCode}</b> - {service.serviceMnemonic}
          </S.SearchResultItem>
        ))}
      </S.SearchResultList>
    )}
  </S.SearchResultContainer>
);

export default SearchResult;
