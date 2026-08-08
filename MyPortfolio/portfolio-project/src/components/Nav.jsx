export function Nav() {
    return (
        <nav>
            <div class="logo">LENSEN DEGIFE</div>

            <div class="menu-toggle" id="menu-toggle">
                <i class="fas fa-bars"></i>
            </div>

            <ul class="options" id="nav-menu">
                <li><a href="#home" class="nav-link active">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#acheivments" class="nav-link">Acheivments</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
        </nav>

    );
}