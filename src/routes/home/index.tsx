import { h } from "preact"
import * as style from "./style.css"

const Home: preact.FunctionalComponent = () => (
  <div className={style.home}>
    <h1>My Home</h1>
    <p>This is the Home component.</p>
  </div>
)

export default Home
