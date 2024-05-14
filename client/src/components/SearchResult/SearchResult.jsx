import "./SearchResult.css";

function SearchResult({ id, name, image, handleClick }) {
  return (
    <div className="mb-3 search-result" onClick={() => handleClick({ id, name, image })}>
      <div className="col-6">
        <img src={image} alt="game-pic" className="game-pic" />
      </div>
      <div className="col-6">
        <p>{name}</p>
      </div>
    </div>
  );
}

export default SearchResult;