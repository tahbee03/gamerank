import { BsFillPersonLinesFill, BsBarChartFill, BsController } from "react-icons/bs"; // <BsFillPersonLinesFill />, <BsBarChartFill />, <BsController />
import "./Result.css";

export default function Result({ type, heading, subheading, link }) {
  return (
    <a className="result col-4" href={link}>
      {(type === "user") && (
        <BsFillPersonLinesFill />
      )}
      {(type === "ranking") && (
        <BsBarChartFill />
      )}
      {(type === "game") && (
        <BsController />
      )}
      <h4>{heading}</h4>
      <p>{subheading}</p>
    </a>
  );
}