import React from 'react'

const Search = ({onSumit}) => {
    function submit(e) {
        if (e.target.value.trim() !== "") {
          console.log(e.target.value)
          onSumit(e.target.value);
        } else if (e.target.value.trim() === "") {
          onSumit(e.target.value);
        }
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
            title='Buscar por nombre y código'
          />
          </div>
        </div>
      );
}
export default Search;