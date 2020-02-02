import { h } from "preact"
import { useContext, useEffect, useState } from "preact/hooks"
import { Container } from "theme-ui"

import { AppContext, GraphContext, UIComponentsContext } from "../contexts"

import { useNavKeys } from "../hooks/useNavKeys"
import Menu from "../components/menu"
import Button from "../components/button"

const Folders: preact.FunctionalComponent = () => {
  const { auth } = useContext(AppContext)
  const { graph } = useContext(GraphContext)
  const { dispatch } = useContext(UIComponentsContext)

  const [taskFolders, setTaskFolders] = useState<any | null>(null)

  useEffect(() => {
    dispatch({
      type: `SET_SOFTKEY_TEXTS`,
      texts: {
        softKeys: [`Add`, `Select`, `Options`],
      },
    })
    dispatch({
      type: `SET_MENU_TEXTS`,
      texts: {
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

  useNavKeys({
    SoftRight: () => openMenu(),
  })

  const openMenu = (): boolean => true

  const userIsLoggedIn = auth.getCurrentUser() != null

  return (
    <Container>
      <h2>My To Do Folders</h2>
      <Button
        text="Sign out"
        name="signout"
        onClick={() => {
          auth.logout()
        }}
      />
      <h4>User</h4>
      <p style={{ wordBreak: `break-all` }}>{JSON.stringify(auth.getCurrentUser())}</p>
      <h4>Task folders</h4>
      <p style={{ wordBreak: `break-all` }}>{JSON.stringify(taskFolders)}</p>
      <Menu open={openMenu()} />
    </Container>
  )
}

export default Folders
