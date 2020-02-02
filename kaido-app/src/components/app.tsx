import { h } from "preact"
import { useContext, useReducer } from "preact/hooks"

import { Box, Container, Flex, ThemeProvider } from "theme-ui"

import { AppContext, UIComponentsContext, UIComponentsReducer } from "../contexts"
import GeneralRoutes from "../routes/general"
import Login from "../routes/login"
import Header from "./header"
import SoftKey from "./softkey"
import KaiUI from "../theme/kaiui"

if ((module as any).hot) {
  /* eslint-disable global-require */
  require(`preact/debug`)
  /* eslint-enable global-require */
}

const defaultTexts = {
  softKeys: [``, ``, ``],
  menus: [``, ``, ``],
}

const App: preact.FunctionalComponent = () => {
  const { auth } = useContext(AppContext)
  const userIsLoggedIn = auth.getCurrentUser() != null

  const [texts, dispatch] = useReducer(UIComponentsReducer, defaultTexts)

  return (
    <ThemeProvider theme={KaiUI}>
      <UIComponentsContext.Provider value={{ texts, dispatch }}>
        <Flex
          id="layout"
          sx={{
            position: `absolute`,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: `column`,
            minHeight: `screenHeight`,
          }}
        >
          <Container as="header">
            <Header text="KaiDo" />
          </Container>
          <Container
            as="main"
            sx={{
              position: `relative`,
              overflowX: `hidden`,
              overflowY: `auto`,
              flex: `auto`,
            }}
          >
            {userIsLoggedIn ? <GeneralRoutes /> : <Login />}
          </Container>
          <Container as="footer">
            <SoftKey />
          </Container>
        </Flex>
      </UIComponentsContext.Provider>
    </ThemeProvider>
  )
}

export default App
