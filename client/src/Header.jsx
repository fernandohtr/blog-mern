import { Link } from "react-router-dom"

function Header() {
  return (
    <header>
      <a href="" className="logo">Blog MERN</a>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  )
}

export default Header
