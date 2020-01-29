import { h } from "preact"
import { Link } from "preact-router/match"

const Header: preact.FunctionalComponent = () => (
  <header>
    <h1>Preact App</h1>
    <nav>
      <Link href="/home">Home</Link>
      <Link href="/profile">Me</Link>
      <Link href="/profile/john">John</Link>
    </nav>
  </header>
)

export default Header
