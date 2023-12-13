/* eslint-disable react/prop-types */
import { BsStarFill, BsStar } from "react-icons/bs";
import "./Ranking.css";
import { format } from "date-fns"; // format()

export default function Ranking({ picurl, title, rank, date, spoiler, desc }) {
    let stars = [];
    let i = 0;

    for (; i < rank; i++) stars.push(<BsStarFill key={i} />);
    for (; i < 5; i++) stars.push(<BsStar key={i} />);

    return (
        <div className="ranking col-4">
            <img className="game-pic" src={picurl} alt="game-pic" />
            <h3 className="game-title">{title}</h3>
            <div>{stars}</div>
            <p className="date">Posted on {format(new Date(date), "MM/dd/yyyy")}</p>
            {(spoiler) && (
                <p className="spoiler-text">Warning: This review contains spoilers. Click to view.</p>
            )}
            {!(spoiler) && (
                <p className="description">{desc}</p>
            )}
        </div>
    );
}

// TODO: Make spoiler text interactive