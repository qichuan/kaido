import { h } from "preact"
import { useRef, useContext, useEffect, useState } from "preact/hooks"
import { Container, Box } from "theme-ui"

import { usePopup, useSoftkey, useNavigation } from "../hooks"
import { GraphContext } from "../contexts"
import Item from "../components/item"
import Menu from "../components/menu"
import Loading from "../components/loading"

type TaskProps = {
  taskId: string
}

const Task = ({ taskId }: TaskProps) => {
  const containerRef = useRef<HTMLDivElement>(null!)
  const menuRef = useRef<HTMLDivElement>(null!)
  const [showMenu] = usePopup(Menu)
  const { graph } = useContext(GraphContext)

  const [task, setTask] = useState<any>(null)
  const [setNavigation, getCurrent, current] = useNavigation(`Task`, containerRef, `y`)

  const onDeleteTask = async () => {
    await graph.deleteTaskAsync(taskId)
    window.history.back()
  }

  const menus = [{ text: `Delete task`, key: `delete-task`, action: onDeleteTask }]

  useSoftkey(`Task`, {
    center: `Select`,
    onKeyCenter: () => undefined,
    right: `Options`,
    onKeyRight: () => showMenu({ menus, containerRef: menuRef }),
    onKeyBackspace: () => window.history.back(),
  })

  useEffect(() => {
    ;(async (): Promise<void> => {
      const taskResponse = await graph.getTaskAsync(taskId)
      setTask(taskResponse)
    })()
  }, [])

  useEffect(() => {
    setNavigation(0)
  }, [])

  return task ? (
    <Container ref={containerRef} variant="kaiui.list">
      <Item
        checkbox="star"
        checked={task.importance === `high`}
        text={task.subject}
        strike={task.status === `completed`}
      />
      <Box data-nav-selectable data-nav-selected-key="taskContent">
        {task.body.content === `` ? `Add note here...` : task.body.content}
      </Box>
    </Container>
  ) : (
    <Loading />
  )
}

export default Task
