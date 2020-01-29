import { h } from "preact"

import AppContext, { createAppContext } from "./contexts/appContext"

import AuthService from "../../kaido-core/src/services/authService"

import App from "./components/app"

const Root: preact.FunctionalComponent = () => {
  const authService = new AuthService()
  authService.handleRedirectCallback()

  const context = createAppContext({
    auth: authService,
  })

  return (
    <AppContext.Provider value={context}>
      <div id="app">
        <App />
      </div>
    </AppContext.Provider>
  )
}

export default Root
