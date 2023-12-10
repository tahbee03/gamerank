import Carousel from 'react-bootstrap/Carousel';
import './ImageCarousel.css';
import { useEffect, useState } from 'react'
const api = import.meta.env.VITE_API_URL; // URL to game API via environment variable
const key = import.meta.env.VITE_API_KEY; // Key for game API


export default function ImageCarousel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    let r = await fetch(`${api}games?key=${key}`);
    let d = await r.json();

    // console.log(d.results);

    let added = [];
    for (let i = 0; i < 5; i++) {
      let index = null;

      do {
        index = Math.floor(Math.random() * d.results.length);
      } while (added.includes(index));

      added.push(index);
      // console.log(added);
    }

    // console.log(d.results.filter((_, i) => (added.includes(i))));
    setData(d.results.filter((_, i) => (added.includes(i))));
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {(loading) && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!(loading) && (data) && (
        <Carousel>
          {data.map((game, i) => (
            <Carousel.Item key={i}>
              <img src={game.background_image} />
              <Carousel.Caption>
                <h3>{game.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
}


/*export default function CarouselComponent(){
    return (
        <div id="carouselExample" className="carousel slide">
            <div className = "carousel-indicators">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="carousel-img1.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="carousel-img2.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="carousel-img3.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}*/