import React, {useState} from 'react';

export default function SearchBar(){
    const [searchInput, setSearchInput] = useState("");
    const handleChange = ({target}) => {
        setSearchInput(target.value);
    }

    return (
        <div>
            <input onChange={handleChange}></input>
            <button></button>
        </div>
    );
};