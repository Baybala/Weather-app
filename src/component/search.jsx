const Search = ({ inputRef, onClicked }) => {
  return (
    <div className="input-group col" style={{ height: '10px' }}>
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Search by city name..."
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        style={{ color: 'white', backgroundColor: 'blue' }}
        id="button-addon2"
        onClick={onClicked}
      >
        Go
      </button>
    </div>
  )
}

export default Search
