import { h } from "preact"

import { AppContext, createAppContext } from "./contexts"

import { AuthService } from "../../kaido-core/src/services"

import "./theme/global.css"
import App from "./components/app"

const Root: preact.FunctionalComponent = () => {
  const authService = new AuthService()
  authService.handleRedirectCallback()

  const context = createAppContext({
    auth: authService,
  })

  return (
    <div id="app">
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>
    </div>
  )
}

export default Root
