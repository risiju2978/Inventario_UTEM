import React from "react";

const Search = ({ onSumit }) => {
  function submit(e) {
    onSumit(e.target.value);
  }

  return (
    <div className="d-flex flex">
      <div>
        <input
          onChange={submit}
          className="px-3 py-2 border-1 rounded rounded-lg"
          type="search"
          placeholder={"Buscar..."}
          name="search"
          title="Buscar por nombre y código"
          size={25}
        />
      </div>
    </div>
  );
};
export default Search;
