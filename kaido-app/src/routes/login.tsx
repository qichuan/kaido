import { h } from "preact"
import { useEffect, useRef, useContext } from "preact/hooks"
import { Container } from "theme-ui"

import { useSoftkey, useNavigation } from "../hooks"
import { AppContext } from "../contexts"
import Button from "../components/button"


const Login = () => {
  const containerRef = useRef(null)
  const { auth } = useContext(AppContext)
  const [setNavigation, getCurrent, current] = useNavigation(`Login`, containerRef, `y`)

  const onKeyCenter = () => undefined

  useSoftkey(`Login`, {
    center: `Select`,
    onKeyCenter: () => auth.login(),
  })

  useEffect(() => setNavigation(0), [])

  return (
    <Container ref={containerRef}>
      <Button text="Sign in" name="signin" />
      <Button text="Sign out" name="signout" />
      <Button text="Hello" name="hello" />
    </Container>
  )
}

export default Login
