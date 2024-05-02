import Carousel from 'react-bootstrap/Carousel';
import './ImageCarousel.css';
import { useEffect, useState } from 'react'
const api = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;


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
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
      }
      {
        !(loading) && (data) && (
          <Carousel>
            {data.map((game, i) => (
              <Carousel.Item key={i}>
                <a href={`/Games/${game.id}`}>
                  <img src={game.background_image} />
                </a>
                <Carousel.Caption>
                  <h3>{game.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )
      }
    </>
  );
}
