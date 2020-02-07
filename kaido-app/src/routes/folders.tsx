import { h, Fragment } from "preact"
import { useContext, useEffect, useState, useRef } from "preact/hooks"
import { route } from "preact-router"
import { Container } from "theme-ui"

import { FolderInterface } from "../../../kaido-core/src/models/folder"
import { AppContext, GraphContext } from "../contexts"

import { useNavKeys } from "../hooks/useNavKeys"
import Menu from "../components/menu"
import Item from "../components/item"
import Separator from "../components/separator"

const Folders: preact.FunctionalComponent = () => {
  const { auth, layoutTexts, dispatch } = useContext(AppContext)
  const { graph } = useContext(GraphContext)

  const { menus } = layoutTexts
  const [taskFolders, setTaskFolders] = useState<any | null>(null)
  const [isMenuOpened, setMenuOpened] = useState(false)

  const user = auth.getCurrentUser()
  const fullname = user ? `${user.fullname}'s` : `My`

  useNavKeys(
    {
      ArrowDown: () => undefined,
      ArrowUp: () => undefined,
      SoftLeft: () => setMenuOpened(false),
      SoftRight: () => setMenuOpened(true),
      Backspace: () => setMenuOpened(false),
    },
    { capture: true, stopPropagation: true, isMenuOpened }
  )

  useEffect(() => {
    dispatch({
      type: `SET_HEADER_TEXTS`,
      layoutTexts: {
        header: `${fullname} To Do Lists`,
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
        menus: [`Search`, `Settings`, `Sign out`],
      },
    })
  }, [])

  // Get Outlook task folders
  useEffect(() => {
    ;(async (): Promise<void> => {
      const folders = await graph.getTaskFoldersAsync()
      setTaskFolders(folders)
    })()
  }, [])

  const handleMenuSelect = (id: string) => {
    switch (id) {
      case `search`:
        break
      case `settings`:
        break
      case `sign-out`:
        auth.logout()
        break
      default:
        break
    }
    setMenuOpened(false)
  }

  return (
    <Container>
      <Item text="My Day" />
      {taskFolders &&
        taskFolders.map((folder: FolderInterface) => {
          const item = (
            <Item text={folder.name} onSelect={() => route(`/taskFolders/${folder.name}/${folder.id}/tasks`)} />
          )
          return folder.isDefault ? (
            <Fragment>
              {item}
              <Separator text="My Lists" />
            </Fragment>
          ) : (
            item
          )
        })}
      {isMenuOpened && <Menu menus={menus} onSelect={id => handleMenuSelect(id)} />}
    </Container>
  )
}

export default Folders
