import { h } from "preact"
import { useReducer } from "preact/hooks"
import { AppContext, createAppContext, LayoutTextsReducer } from "./contexts"

import { AuthService } from "../../kaido-core/src/services"

import App from "./components/app"
import "./theme/global.css"

// if ((module as any).hot) {
if (process.env.NODE_ENV === `development`) {
  /* eslint-disable global-require */
  require(`preact/debug`)
  /* eslint-enable global-require */
}

const Root: preact.FunctionalComponent = () => {
  const authService = new AuthService()
  authService.handleRedirectCallback()

  const defaultTexts = {
    header: `KaiDo`,
    softKeys: [``, ``, ``],
    menus: [``, ``, ``],
  }
  const [texts, dispatch] = useReducer(LayoutTextsReducer, defaultTexts)

  const context = createAppContext({
    auth: authService,
    layoutTexts: texts,
    dispatch,
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
