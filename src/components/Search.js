import '../styles/Search.css';

function Search({handleSearch}) {
    const handleChange = (event) => {
        handleSearch(event.target.value, 0, 10);
    };

    return (
        <div className="search">
            <input onChange={handleChange} placeholder="Пошук..." className={"search-input"}
                   type="search"/>
        </div>
    );
}

export default Search;