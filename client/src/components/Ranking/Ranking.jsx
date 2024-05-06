/* eslint-disable react/prop-types */
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import "./Ranking.css";
import { format } from "date-fns"; // format()
import { useState } from "react";

export default function Ranking({ id, picurl, title, rank, date, spoiler, desc }) {
    const [spoilerState, setSpoilerState] = useState(spoiler);
    const hasHalfStar = rank % 1 !== 0;
    let stars = [];
    let i = 0;

    if(hasHalfStar) {
        for (; i < rank; i++) stars.push(<BsStarFill key={i} />);
        stars.push(<BsStarHalf key={i} />);
        for (; i < 4; i++) stars.push(<BsStar key={i} />);
    } else {
        for (; i < rank; i++) stars.push(<BsStarFill key={i} />);
        for (; i < 5; i++) stars.push(<BsStar key={i} />);
    }

    return (
        <div className="ranking col-4">
            <a href={`/Games/${id}`}>
                <img className="game-pic" src={picurl} alt="game-pic" />
            </a>
            <h3 className="game-title">{title}</h3>
            <div>{stars}</div>
            <p className="date">Posted on {format(new Date(date), "MM/dd/yyyy")}</p>
            {(spoilerState) && (
                <p className="spoiler-text" onClick={() => setSpoilerState(false)}>Warning: This review contains spoilers. Click to view.</p>
            )}
            {!(spoilerState) && (
                <p className="description">{desc}</p>
            )}
        </div>
    );
}