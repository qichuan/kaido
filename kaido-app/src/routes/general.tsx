import { h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"
import { useContext } from "preact/hooks"

import { GraphService } from "../../../kaido-core/src/services"
import Folders from "./folders"
import Profile from "./profile"

import { AppContext, GraphContext } from "../contexts"
import TaskList from "./taskList"
import Task from "./task"
import Portfolio from "./portfolio"

const GeneralRoutes: preact.FunctionalComponent = () => {
  let currentUrl: string
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url
  }

  const { auth } = useContext(AppContext)
  const graph = new GraphService(auth)

  return (
    <GraphContext.Provider value={{ graph }}>
      <Router onChange={handleRoute}>
        {/* <Route path="/portfolio" component={Portfolio as any} default /> */}
        <Route path="/taskFolders" component={Folders as any} default />
        <Route path="/taskFolders/:folderName/:folderId/tasks" component={TaskList as any} />
        <Route path="/task/:taskId" component={Task as any} />
        <Route path="/profile/" component={Profile as any} user="me" />
      </Router>
    </GraphContext.Provider>
  )
}

export default GeneralRoutes
