import './Footer.css'
export function Footer() {
    return (
        <footer class="footer">
            <div class="footer-content">
                <p class="footer-text">
                    © 2026 <span>Lensen Degife</span>. All rights reserved.
                </p>

                <div class="footer-links">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#acheivments">Acheivments</a>
                    <a href="#contact">Contact</a>
                </div>

                <div class="footer-social">
                    <a href="https://github.com/lensen-degife" target="_blank"><i class="fab fa-github"></i></a>
                    <a href="https://leetcode.com/lensen-degife" target="_blank"><i class="fas fa-code"></i></a>
                    <a href="https://www.linkedin.com/in/lensen-degife-60661b3b2/" target="_blank"><i
                        class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </footer>
    )
}