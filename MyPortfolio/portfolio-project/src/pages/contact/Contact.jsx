import './Contact.css'
export function Contact() {
    return (
        <>
        <section id="contact">
            <h2><span>Contact Me</span></h2>

            <div class="contact-container">
                <form autocomplete="off" action="https://formspree.io/f/xzdjvlda" method="POST" class="contact-container">
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your message..." required></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>

            <div class="social-media">
                <a href="https://github.com/lensen-degife" class="icon" target="_blank"><i class="fab fa-github"></i></a>
                <a href="https://leetcode.com/lensen-degife" class="icon" target="_blank"><i class="fas fa-code"></i></a>
                <a href="https://www.linkedin.com/in/lensen-degife-60661b3b2/" class="icon" target="_blank"><i
                    class="fab fa-linkedin-in"></i></a>
            </div>
        </section>
        </>

    )
}