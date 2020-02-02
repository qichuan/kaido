import { h } from "preact"
import { useEffect, useState } from "preact/hooks"

type ProfileProps = {
  user?: string
}

const Profile: preact.FunctionalComponent<ProfileProps> = ({ user }) => {
  const [time, setTime] = useState<number>(Date.now())
  const [count, setCount] = useState<number>(0)

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
      <h1>Profile: {user}</h1>
      <p>This is the user profile for a user named {user}.</p>

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

export default Profile
