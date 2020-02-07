import { h } from "preact"
import { route } from "preact-router"
import { useEffect, useState, useContext } from "preact/hooks"
import { Container } from "theme-ui"

import { useNavKeys } from "../hooks"
import { AppContext, GraphContext } from "../contexts"
import { TaskListInterface } from "../../../kaido-core/src/models/taskList"
import Item from "../components/item"
import Menu from "../components/menu"

type TaskListProps = {
  folderName: string
  folderId: string
}

const TaskList: preact.FunctionalComponent<TaskListProps> = ({ folderName, folderId }) => {
  const { layoutTexts, dispatch } = useContext(AppContext)
  const { graph } = useContext(GraphContext)

  const { menus } = layoutTexts
  const [taskLists, setTaskLists] = useState<any | null>(null)
  const [isMenuOpened, setMenuOpened] = useState(false)

  useNavKeys(
    {
      ArrowDown: () => undefined,
      ArrowUp: () => undefined,
      SoftLeft: () => setMenuOpened(false),
      SoftRight: () => setMenuOpened(true),
      Backspace: () => route(`/folders`),
    },
    { capture: true, stopPropagation: true, isMenuOpened }
  )

  useEffect(() => {
    dispatch({
      type: `SET_HEADER_TEXTS`,
      layoutTexts: {
        header: folderName,
      },
    })
    dispatch({
      type: `SET_SOFTKEY_TEXTS`,
      layoutTexts: {
        softKeys: [`Add`, `Select`, `Options`],
      },
    })
    dispatch({
      type: `SET_MENU_TEXTS`,
      layoutTexts: {
        menus: [`Mark as complete`, `Rename list`, `Hide completed tasks`, `Delete list`],
      },
    })
  }, [])

  // Get Outlook tasks for selected folder
  useEffect(() => {
    ;(async (): Promise<void> => {
      const lists = await graph.getTaskFolderListsAsync(folderId)
      setTaskLists(lists)
    })()
  }, [])

  const handleMenuSelect = (id: string) => {
    switch (id) {
      case `mark-as-complete`:
        break
      case `rename-list`:
        break
      case `hide-completed-tasks`:
        break
      case `delete-list`:
        break
      default:
        break
    }
    setMenuOpened(false)
  }

  return (
    <Container>
      {taskLists &&
        taskLists.map((list: TaskListInterface) => (
          <Item type="twoLines" text={list.subject} onSelect={() => route(`/task`)} />
        ))}

      {/* <div>Current time: {new Date(time).toLocaleString()}</div> */}
      {isMenuOpened && <Menu menus={menus} onSelect={id => handleMenuSelect(id)} />}
    </Container>
  )
}

export default TaskList
