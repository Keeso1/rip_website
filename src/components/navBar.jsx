import React, {useState} from 'react';
import reactLogo from '../assets/react.svg'
import SearchBar from './searchBar';
import '../App.css';

export default function NavBar(){
    return (
        <div>
            <img src={reactLogo} alt='logo'/>
            <SearchBar/>
        </div>
    );
};