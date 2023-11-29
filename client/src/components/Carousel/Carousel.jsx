import './Carousel.css'

function Carousel(){
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/.carousel-img1.jpg" className="d-block w-100" alt="Slide 1" />
                </div>
                <div className="carousel-item">
                    <img src="/game_rank/public/carousel-img2.jpg" className="d-block w-100" alt="Slide 2" />
                </div>
                <div className="carousel-item">
                    <img src="/game_rank/public/carousel-img3.jpg" className="d-block w-100" alt="Slide 3" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel