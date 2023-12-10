import './Home.css'
import Navbar from '../Navbar/Navbar.jsx'
import Carousel from '../Carousel/Carousel.jsx'
import Featured from '../Featured/Featured.jsx'
import Footer from '../Footer/Footer.jsx'

function Home() {
    return (
        <>
            <Navbar />
            <Carousel />
            <Featured />
            <Footer />
        </>
    );
}

export default Home