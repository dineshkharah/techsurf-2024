import Navbar from '../app/components/Navbar';
import '../app/globals.css';  // Assuming you have global styles for all pages

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
