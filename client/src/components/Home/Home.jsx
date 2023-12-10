import './Home.css'
import Navbar from '../Navbar/Navbar.jsx'
import ImageCarousel from '../ImageCarousel/ImageCarousel.jsx'
import Featured from '../Featured/Featured.jsx'
import Footer from '../Footer/Footer.jsx'

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