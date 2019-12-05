import React from "react";

const SearchBar = props => {
  const handleChange = ev => {
    props.onChange(ev.target.value);
  };

  return (
    <input
      type="search"
      placeholder="Busque por uma linha"
      onChange={handleChange}
    />
  );
};

export default SearchBar;
