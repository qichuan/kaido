import { h } from "preact"
import { route } from "preact-router"
import { useEffect, useState, useContext, useRef } from "preact/hooks"
import { Container, Text } from "theme-ui"

import { useSoftkey, useNavigation, usePopup } from "../hooks"
import { AppContext, GraphContext } from "../contexts"
import { TaskInterface } from "../../../kaido-core/src/models/task"
import Item from "../components/item"
import Menu from "../components/menu"
import Input from "../components/input"
import Dialog from "../components/dialog"
import Loading from "../components/loading"

type TaskListProps = {
  folderName: string
  folderId: string
}

const TaskList = ({ folderName, folderId }: TaskListProps) => {
  const containerRef = useRef(null)
  const menuRef = useRef<HTMLDivElement>(null!)
  const inputRef = useRef<HTMLDivElement>(null!)

  const { dispatch } = useContext(AppContext)
  const { graph } = useContext(GraphContext)

  const [taskLists, setTaskLists] = useState<any | null>(null)
  const [refresh, setRefresh] = useState(false)
  const [hideCompleted, setHideCompleted] = useState(false)

  const [showMenu] = usePopup(Menu)
  const [showInput] = usePopup(Input)
  const [showDialog] = usePopup(Dialog)
  const [setNavigation, getCurrent, current] = useNavigation(`TaskList`, containerRef, `y`)

  const onDialogKeyRight = async () => {
    await graph.deleteTaskFolderAsync(folderId)
    route(`/taskFolders`)
  }

  const deleteConfirmation = {
    title: `Delete task list`,
    content: `Do you confirm to delete the task list: ${folderName}?`,
    center: `Cancel`,
    right: `Delete`,
    onDialogKeyRight,
  }

  const onCreateTask = async (subject: string) => {
    await graph.createTaskAsync(folderId, subject)

    setRefresh(!refresh)
  }

  const onMarkComplete = async () => {
    const { index } = getCurrent()
    const task = taskLists[index]

    if (task.status !== `completed`) {
      await graph.completeTaskAsync(task.id)

      setRefresh(!refresh)
    }
  }

  const onUnmarkComplete = async () => {
    const { index } = getCurrent()
    const task = taskLists[index]

    if (task.status === `completed`) {
      const notStarted = { status: `notStarted` }
      await graph.updateTaskAsync(task.id, notStarted)

      setRefresh(!refresh)
    }
  }

  const onHideCompleted = () => setHideCompleted(!hideCompleted)

  const onRenameList = () => {
    showDialog({ title: `Oops...`, content: `Rename list feature is working in progress...` })
  }

  const onDeleteList = () => {
    showDialog(deleteConfirmation)
  }

  const completedMenuTitle = hideCompleted ? `Show` : `Hide`
  const menus = [
    { text: `Mark as complete`, key: `mark-as-complete`, action: onMarkComplete },
    { text: `${completedMenuTitle} completed tasks`, key: `hide-complete-tasks`, action: onHideCompleted },
    { text: `Rename list`, key: `rename-list`, action: onRenameList, confirm: true },
    { text: `Delete list`, key: `delete-list`, action: onDeleteList, confirm: true },
  ]

  const onKeyCenter = () => {
    const { index } = getCurrent()
    const task = taskLists[index]
    route(`task/${task.id}`)
  }

  useSoftkey(
    `TaskList`,
    {
      left: `Add`,
      onKeyLeft: () =>
        showInput({ label: `Add new task`, placeholder: `Task here...`, action: onCreateTask, containerRef: inputRef }),
      center: `Select`,
      onKeyCenter,
      right: `Options`,
      onKeyRight: () => showMenu({ menus, containerRef: menuRef }),
      onKeyArrowLeft: onUnmarkComplete,
      onKeyArrowRight: onMarkComplete,
      onKeyBackspace: () => route(`/taskFolders`),
    },
    [current]
  )

  // Get Outlook tasks for selected folder
  useEffect(() => {
    ;(async (): Promise<void> => {
      const tasksResponse = await graph.getTaskFolderListsAsync(folderId)
      setTaskLists(tasksResponse)
    })()
  }, [refresh])

  useEffect(() => {
    dispatch({
      type: `SET_HEADER_TEXTS`,
      layoutTexts: {
        header: folderName,
      },
    })

    setNavigation(0)
  }, [])

  return taskLists ? (
    <Container ref={containerRef} variant="kaiui.list">
      {taskLists.length > 0 ? (
        taskLists.map((task: TaskInterface) => {
          const completed = task.status === `completed`
          const importance = task.importance === `high`
          if (completed && hideCompleted) return
          return <Item checkbox="star" checked={importance} text={task.subject} strike={completed} />
        })
      ) : (
        <Text as="p" variant="kaiui.p.sec" sx={{ p: 3 }}>
          You have done all tasks for this list.
        </Text>
      )}
    </Container>
  ) : (
    <Loading />
  )
}

export default TaskList
