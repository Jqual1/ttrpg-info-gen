import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
    return <nav className="nav">
        <Link to="/ttrpg-info-gen/" className="site-title">
            TTRPG Info Generator
        </Link>
        <ul>
            <CustomLink to="/ttrpg-info-gen/gen-info">Generate Info</CustomLink>
            <CustomLink to="/ttrpg-info-gen/gen-num">Generate Number</CustomLink>
        </ul>
    </nav>
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}