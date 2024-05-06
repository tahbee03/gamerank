import './Home.css'
import Featured from '../Featured/Featured.jsx'
import Footer from '../Footer/Footer.jsx'
import ImageCarousel from '../ImageCarousel/ImageCarousel.jsx'
import Navbar from '../Navbar/Navbar.jsx'

function Home() {
    return (
        <>
            <Navbar />
            <ImageCarousel />
            <Featured />
            <Footer />
        </>
    );
}

export default Home