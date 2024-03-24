import "./SearchResult.css";
import { Row, Col } from "react-bootstrap";

function SearchResult({ name, image, handleClick }) {
  return (
    <Row className="mb-3 search-result" onClick={() => handleClick({ name, image })}>
      <Col className="column" xs={12} sm={4}>
        <img src={image} alt="game-pic" className="game-pic" />
      </Col>
      <Col className="column" xs={12} sm={8}>
        <p>{name}</p>
      </Col>
    </Row>
  );
}

export default SearchResult;