import { h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"
import { useContext, useEffect, useState } from "preact/hooks"

import { GraphService, GraphServiceInterface } from "../../../kaido-core/src/services"
import { Config } from "../../../kaido-core/config"

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

  // const [graph, setGraph] = useState<GraphServiceInterface | null>(null)

  const { auth } = useContext(AppContext)
  const graph = new GraphService(auth)

  /** 
  const { scopes, version } = Config.graph

  useEffect(() => {
    ;(async (): Promise<void> => {
      const { token } = await auth.getAccessTokenAsync(scopes)

      if (token) {
        const graphService = new GraphService({
          authProvider: done => done(null, token),
          defaultVersion: version,
        })
        setGraph(graphService)
      }
    })()
  }, [])
  */

  return (
    <GraphContext.Provider value={{ graph }}>
      <Router onChange={handleRoute}>
        <Route path="/taskFolders" component={Folders as any} default />
        <Route path="/taskFolders/:folderName/:folderId/tasks" component={TaskList as any} />
        <Route path="/task/" component={Task as any} />
        <Route path="/profile/" component={Profile as any} user="me" />
      </Router>
    </GraphContext.Provider>
  )
}

export default GeneralRoutes
