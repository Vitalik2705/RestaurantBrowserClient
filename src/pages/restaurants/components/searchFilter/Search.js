import './styles/Search.css';
import {useLanguage} from "../../../../contexts/LanguageContext";

function Search({handleSearch}) {
  const { text } = useLanguage();

  const handleChange = (event) => {
    handleSearch(event.target.value, 0, 10);
  };

  return (
    <div className="search">
      <input
        onChange={handleChange}
        placeholder={text.search.placeholder}
        className="search-input"
        type="search"
      />
    </div>
  );
}

export default Search;