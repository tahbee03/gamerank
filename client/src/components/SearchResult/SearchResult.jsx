import "./SearchResult.css";
import { Row, Col } from "react-bootstrap";

function SearchResult({ name, image, handleClick }) {
  return (
    <div className="mb-3 search-result" onClick={() => handleClick({ name, image })}>
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