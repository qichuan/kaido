import { h } from "preact"
import { useContext } from "preact/hooks"

import { AppContext } from "../contexts"

import Button from "../components/button"

const Login: preact.FunctionalComponent = () => {
  const { auth } = useContext(AppContext)

  const userIsLoggedIn = auth.getCurrentUser() != null

  return (
    <div>
      <Button
        text="Sign in"
        name="signin"
        onClick={() => {
          auth.login()
        }}
      />
      <Button
        text="Sign out"
        name="signout"
        onClick={() => {
          auth.logout()
        }}
      />
    </div>
  )
}

export default Login
