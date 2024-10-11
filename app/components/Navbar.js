import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarLinks}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/visuals">Visuals</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
