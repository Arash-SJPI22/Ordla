import "../style/header.scss"

export default function Header()
{
    return (
            <menu className="menu">
                <ul className="header-list">
                    <li className="header-item"><a href="/">ORDLE</a></li>
                    <li className="header-item"><a href="/highscore">HIGHSCORE</a></li>
                    <li className="header-item"><a href="/about">OM OSS</a></li>
                </ul>
            </menu>
    );
}