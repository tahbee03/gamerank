import Carousel from 'react-bootstrap/Carousel';
import '../styles/Carousel.css';


export default function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item className='carousel-image'>
        <img src='carousel-img1.jpg'/>
      </Carousel.Item>
      <Carousel.Item className='carousel-image'>
        <img src='carousel-img2.jpg'/>
      </Carousel.Item>
      <Carousel.Item className='carousel-image'>
        <img src='carousel-img3.jpg' />
      </Carousel.Item>
    </Carousel>
  );
}