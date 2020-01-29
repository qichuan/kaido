import { h } from "preact"
import { useContext } from "preact/hooks"

import AppContext from "../contexts/appContext"

const Home: preact.FunctionalComponent = () => {
  const { auth } = useContext(AppContext)

  const userIsLoggedIn = auth.getCurrentUser() != null

  return (
    <div>
      <h1>My Home</h1>
      <p>This is the Home component.</p>
      <p>
        <button
          type="button"
          onClick={() => {
            auth.login()
          }}
        >
          Sign In
        </button>
      </p>
      <p>
        <button
          type="button"
          onClick={() => {
            auth.logout()
          }}
        >
          Sign Out
        </button>
      </p>
      {userIsLoggedIn ? <p>{JSON.stringify(auth.getCurrentUser())}</p> : null}
    </div>
  )
}

export default Home
