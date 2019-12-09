import React from "react";
import * as S from "./styled";

const SearchBar = ({ onChange, isLoading, renderResults }) => {
  const handleChange = ev => {
    onChange(ev.target.value);
  };

  const handleSubmit = ev => {
    ev.preventDefault();
  };

  return (
    <S.SearchBar>
      <S.SearchForm action="/" method="GET" onSubmit={handleSubmit}>
        <S.SearchInput
          type="search"
          placeholder="Busque por uma linha"
          onChange={handleChange}
        />
        {isLoading && (
          <S.SearchLoader>
            <span role="img" aria-label="loading indicator">
              ⏳
            </span>
          </S.SearchLoader>
        )}
      </S.SearchForm>
      {renderResults()}
    </S.SearchBar>
  );
};

export default SearchBar;
