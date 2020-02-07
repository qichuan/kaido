import { h } from "preact"
import { Container } from "theme-ui"

import Button from "../components/button"
import { useNavKeys } from "../hooks"

const Task: preact.FunctionalComponent = () => {
  useNavKeys({
    ArrowDown: () => undefined,
    ArrowUp: () => undefined,
  })
  return (
    <Container>
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
      <Button text="Sign in" name="signin" onClick={() => undefined} />
    </Container>
  )
}

export default Task
