import styled from "styled-components";

export const SearchResultContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  max-height: 50vh;
  background-color: #fff;
  overflow: auto;
`;

export const SearchResultList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const SearchResultItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:first-child {
    border-top: 1px solid #ddd;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const EmptyResultList = styled.p`
  font-size: 16px;
`;
