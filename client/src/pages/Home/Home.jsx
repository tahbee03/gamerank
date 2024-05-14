import './Home.css'
import Featured from '../../components/Featured/Featured.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'

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