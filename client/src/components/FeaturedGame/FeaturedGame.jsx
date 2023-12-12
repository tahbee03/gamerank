/* eslint-disable react/prop-types */
import "./FeaturedGame.css";

export default function FeaturedGame({ title, picture, reviews }) {
    return (
        <div className="featured-game">
            <img className="game-pic" src={picture} alt="picture-image" />
            <div>
                <hr />
                <p className="game-title">{title}</p>
                <p>{reviews} reviews</p>
            </div>
        </div>
    );
}