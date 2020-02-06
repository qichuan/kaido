import { h } from "preact"
import { route } from "preact-router"
import { useEffect, useState } from "preact/hooks"
import { useNavKeys } from "../hooks"

type TaskListProps = {
  id?: string
}

const TaskList: preact.FunctionalComponent<TaskListProps> = ({ id }) => {
  const [time, setTime] = useState<number>(Date.now())
  const [count, setCount] = useState<number>(0)

  useNavKeys({
    Backspace: () => route(`/taskFolders`),
  })

  // gets called when this route is navigated to
  useEffect(() => {
    const timer = window.setInterval(() => setTime(Date.now()), 1000)

    // gets called just before navigating away from the route
    return () => {
      clearInterval(timer)
    }
  }, [])

  // update the current time
  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>Hi: {id}</h1>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <button type="button" onClick={increment}>
          Click Me
        </button>
        Clicked {count} times.
      </p>
    </div>
  )
}

export default TaskList
