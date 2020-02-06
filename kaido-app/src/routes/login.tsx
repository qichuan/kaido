import { h } from "preact"
import { useContext, useRef, useEffect } from "preact/hooks"
import { Container } from "theme-ui"

import { AppContext } from "../contexts"
import Button from "../components/button"
import { useNavKeys } from "../hooks"

const Login: preact.FunctionalComponent = () => {
  const { auth } = useContext(AppContext)

  useNavKeys({
    ArrowDown: () => undefined,
    ArrowUp: () => undefined,
  })

  return (
    <Container>
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
      <Button text="Hello" name="hello" onClick={() => undefined} />
    </Container>
  )
}

export default Login
