const Search = ({ onChange, onKeyDown }) => {
  return (
    <div className="input-group col" style={{ height: '10px' }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search by city name..."
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        style={{ color: 'white', backgroundColor: 'blue' }}
        id="button-addon2"
        onClick={() => onKeyDown({ key: 'Enter' })}
      >
        Go
      </button>
    </div>
  )
}

export default Search
