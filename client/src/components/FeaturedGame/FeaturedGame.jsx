import "./FeaturedGame.css";

export default function FeaturedGame({ title, picture, reviews }) {
    return (
        <div className="featured-game">
            <img className="featured-game-pic" src={picture} alt="picture-image" />
            <div>
                <hr />
                <p className="featured-game-title">{title}</p>
                <p>{reviews} reviews</p>
            </div>
        </div>
    );
}