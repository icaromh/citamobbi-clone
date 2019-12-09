import styled from "styled-components";

export const SearchBar = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #fdfdfd;
  box-shadow: 1px 1px 5px #ddd;
  padding: 5px 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

export const SearchForm = styled.form`
  display: flex;
  flex-grow: 1;
  width: 100%;
  align-content: center;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: 0;
  height: 40px;
`;

export const SearchLoader = styled.span``;
