import React from "react";
import { Input } from "semantic-ui-react";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input 
    size='big'
    type="text"
    name="query"
    className="field"
    placeholder="Search..."
    value={value}
    onChange={e => onChange(e.currentTarget.value)}
    fluid icon='search' 
    placeholder='Search...' 
    />
   
  );
};

export default SearchBox;
