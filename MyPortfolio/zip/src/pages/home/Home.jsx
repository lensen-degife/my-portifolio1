import { Nav } from '../../components/Nav'
import './Home.css'

export function Home() {
    return (
        <>
            <Nav />
            <section id="home">
                <div class="home-img">
                    <img src="pp.jpg" alt="profile" />
                </div>
                <div class="general">
                    <h2>Hi, I'm <span>Lensen Degife</span></h2>

                    <h4>I am a <span class="typing"></span></h4>
                    <p>Computer Science student at Addis Ababa University with a passion for software development and continuous
                        learning. I enjoy transforming ideas into practical solutions through
                        clean code and thoughtful design.
                        Always striving to grow and contribute in the tech industry.
                        Let's connect and build something great.</p>
                    <a class="resume" href="LensenDegifeCV1.pdf" target="_blank">Download Resume</a>
                </div>
            </section>
        </>
    )
}