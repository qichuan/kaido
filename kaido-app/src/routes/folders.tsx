import { h, Fragment } from "preact"
import { useContext, useEffect, useState, useRef } from "preact/hooks"
import { route } from "preact-router"
import { Container } from "theme-ui"

import emojiRegex from "emoji-regex"

import { FolderInterface } from "../../../kaido-core/src/models/folder"
import { AppContext, GraphContext } from "../contexts"
import { useSoftkey, useNavigation, usePopup } from "../hooks"
import Item from "../components/item"
import Separator from "../components/separator"
import Menu from "../components/menu"
import Input from "../components/input"
import Loading from "../components/loading"
import Dialog from "../components/dialog"
import { IconMyDay, IconMyFolder, IconCustomFolder } from "../components/icons"

const Folders: preact.FunctionalComponent = () => {
  const containerRef = useRef(null)
  const menuRef = useRef<HTMLDivElement>(null!)
  const inputRef = useRef<HTMLDivElement>(null!)

  const { auth, dispatch } = useContext(AppContext)
  const { graph } = useContext(GraphContext)

  const [showMenu] = usePopup(Menu)
  const [showInput] = usePopup(Input)
  const [showDialog] = usePopup(Dialog)

  const [setNavigation, getCurrent, current] = useNavigation(`Folders`, containerRef, `y`)

  const [taskFolders, setTaskFolders] = useState<any | null>(null)
  const [refresh, setRefresh] = useState(false)

  const user = auth.getCurrentUser()
  const fullname = user ? `${user.fullname}'s` : `My`

  const regex = emojiRegex()

  const onCreateFolder = async (name: string) => {
    await graph.createTaskFolderAsync(name)

    setRefresh(!refresh)
  }

  const onSearch = () => {
    showDialog({ title: `Oops...`, content: `Search feature is working in progress...` })
  }

  const onSettings = () => {
    showDialog({ title: `Oops...`, content: `Settings feature is working in progress...` })
  }

  const onSignOut = () => auth.logout()

  const menus = [
    { text: `Search`, key: `search`, action: onSearch, confirm: true },
    { text: `Settings`, key: `settings`, action: onSettings, confirm: true },
    { text: `Sign out`, key: `sign-out`, action: onSignOut },
  ]

  const onKeyCenter = () => {
    const { index } = getCurrent()

    // Skip "My Day" section
    if (index > 0) {
      const folder = taskFolders[index - 1]
      route(`/taskFolders/${folder.name}/${folder.id}/tasks`)
    }
  }

  useSoftkey(
    `Folders`,
    {
      left: `New`,
      onKeyLeft: () =>
        showInput({
          label: `Add new list`,
          placeholder: `List name here...`,
          action: onCreateFolder,
          containerRef: inputRef,
        }),
      center: `Select`,
      onKeyCenter,
      right: `Options`,
      onKeyRight: () => showMenu({ menus, containerRef: menuRef }),
    },
    [current]
  )

  // Get Outlook task folders
  useEffect(() => {
    ;(async (): Promise<void> => {
      const foldersResponse = await graph.getTaskFoldersAsync()
      setTaskFolders(foldersResponse)
    })()
  }, [refresh])

  useEffect(() => {
    dispatch({
      type: `SET_HEADER_TEXTS`,
      layoutTexts: {
        header: `${fullname} To Do Lists`,
      },
    })

    setNavigation(0)
  }, [])

  return taskFolders ? (
    <Container ref={containerRef} variant="kaiui.list">
      <Item text="My Day">
        <IconMyDay />
      </Item>
      {taskFolders.map((folder: FolderInterface) => {
        if (folder.isDefault) {
          return (
            <Fragment>
              <Item text={folder.name}>
                <IconMyFolder />
              </Item>
              <Separator text="My Lists" />
            </Fragment>
          )
        }

        // use emoji-regex to detect if folder starts with an emoji
        if (!regex.test([...folder.name][0])) {
          return (
            <Item text={folder.name}>
              <IconCustomFolder />
            </Item>
          )
        }

        return <Item text={folder.name} />
      })}
    </Container>
  ) : (
    <Loading />
  )
}

export default Folders
