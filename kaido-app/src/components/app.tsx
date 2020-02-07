/* eslint-disable react/jsx-props-no-spreading */
import { h } from "preact"
import { useContext, useReducer } from "preact/hooks"

import { Container, Flex, ThemeProvider } from "theme-ui"

import { AppContext } from "../contexts"
import GeneralRoutes from "../routes/general"
import Login from "../routes/login"
import Header from "./header"
// import SoftKey from "./softkey"
import { Softkey } from "./softkeys"
import KaiUI from "../theme/kaiui"
import Portfolio from "../routes/portfolio"

import { SoftKeyReducer, SoftKeyContext } from "../hooks/useSoftKey"

if ((module as any).hot) {
  /* eslint-disable global-require */
  require(`preact/debug`)
  /* eslint-enable global-require */
}

const App: preact.FunctionalComponent = () => {
  const { auth, layoutTexts } = useContext(AppContext)
  const userIsLoggedIn = auth.getCurrentUser() != null
  const { header, softKeys } = layoutTexts

  const [state, dispatch] = useReducer(SoftKeyReducer, {})

  return (
    <ThemeProvider theme={KaiUI}>
      <SoftKeyContext.Provider value={{ state, dispatch }}>
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
            <Header text={header} />
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
            {userIsLoggedIn ? <GeneralRoutes /> : <Portfolio />}
          </Container>
          <Container as="footer">
            {/* <SoftKey left={softKeys[0]} center={softKeys[1]} right={softKeys[2]} /> */}
            <Softkey {...state.current} />
          </Container>
        </Flex>
      </SoftKeyContext.Provider>
    </ThemeProvider>
  )
}

export default App
