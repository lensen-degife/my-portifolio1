import udacityCert from '../../assets/udacity.certificate.pdf'
import simplilearnCert from '../../assets/simplilearnCertificate.pdf'

export function AboutCards() {
    return (
        <div className="about-cards">

            <div className="card">
                <h3>📂 Projects</h3>
                <p>Full Stack E-commerce web app</p>
                <p>Personal Portfolio Website</p>
                <p>Library Management System</p>
                <p>Shop Billing System</p>
                <p>Students Schedule Tracker</p>
                <a href="https://github.com/lensen-degife" className="icon" target="_blank">Visit My GitHub For More</a>


            </div>
            <div className="card">
                <h3>📃 Certificates</h3>
                <p>Udacity <a href={udacityCert} download>Download PDF</a></p>
                <p>Simplilearn <a href="simplilearnCertificate.pdf" download>Download PDF</a></p>
                <p>SQL <a href={simplilearnCert} > see</a></p>
            </div>

            <div className="card">
                <h3>💻 Skills</h3>
                <p><strong>Languages:</strong> C++, Java, Python, SQL, JavaScript</p>
                <p><strong>Web Dev:</strong> HTML, CSS, React</p>
                <p><strong>Tools:</strong> Git, GitHub, MySQL, Micosoft SQL Server</p>
            </div>

            <div className="card">
                <h3>🏆 Acheivments</h3>
                <p>Completed 100+ coding challenges on LeetCode</p>
                <p>Contributed to open-source projects on GitHub</p>
            </div>

            <div className="card">
                <h3>📜 Courses</h3>
                <p>Data Structures and Algorithms</p>
                <p>Web Development with React</p>
                <p>Database Management Systems</p>
            </div>

        </div>
    )
}