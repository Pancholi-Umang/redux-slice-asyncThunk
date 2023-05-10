import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSearchCocktail } from '../redux/cocktailSlice';

const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const focusInput = (e) => {
        setSearch(e.target.value)
    }
    
    const handleSubmit = () => {
        dispatch(fetchSearchCocktail({search}))
    }

    return (
        <form className="form-inline my-2 my-lg-0 border" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={focusInput} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

    )
}

export default Search