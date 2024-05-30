/* eslint-disable react/prop-types */
import { BsStarFill, BsStar, BsStarHalf, BsTrash } from "react-icons/bs";
import "./Ranking.css";
import { format } from "date-fns"; // format()
import { useState } from "react";
const server = import.meta.env.VITE_BACKEND_SERVER;

export default function Ranking({ id, author, gameID, picurl, title, rank, date, spoiler, desc, canDelete }) {
    const [spoilerState, setSpoilerState] = useState(spoiler);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const hasHalfStar = rank % 1 !== 0;
    let stars = [];
    let i = 0;

    if (hasHalfStar) {
        for (; i < Math.floor(rank); i++) stars.push(<BsStarFill key={i} />);
        stars.push(<BsStarHalf key={i} />);
        i++;
    } else {
        for (; i < rank; i++) stars.push(<BsStarFill key={i} />);
    }
    
    for (; i < 5; i++) stars.push(<BsStar key={i} />);
    async function handleDelete() {
        setLoadingDelete(true);
        try {
            const response = await fetch(`${server}rankings/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author })
            });
            await response.json();

            if (!response.ok) {
                setLoadingDelete(false);
                throw new Error("Failed to delete ranking.");
            }
            else window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="ranking col-4">
            <a href={`/Games/${gameID}`}>
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
            {(canDelete) && (
                <>
                    {(loadingDelete) && (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    {!(loadingDelete) && (
                        <BsTrash className="trash-icon" onClick={handleDelete} />
                    )}
                </>
            )}
        </div>
    );
}