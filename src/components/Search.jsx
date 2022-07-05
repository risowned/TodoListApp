function Search(props) {
  return (
    <div className="searchDiv">
      <input
        className="searchBar"
        type="text"
        placeholder="Search..."
        onChange={(e) => props.onFilteredToDoListChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
