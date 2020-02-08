/* eslint-disable react/jsx-props-no-spreading */
import { h } from "preact"
import { useContext, useReducer, useState } from "preact/hooks"

import { Container, Flex, ThemeProvider } from "theme-ui"

import { AppContext, SoftkeyReducer, SoftkeyContext, PopupContext } from "../contexts"
import GeneralRoutes from "../routes/general"
import Login from "../routes/login"
import Header from "./header"
// import SoftKey from "./softkey"
import { Softkey } from "./softkeys"
import KaiUI from "../theme/kaiui"
import Portfolio from "../routes/portfolio"
import { PopupContainer } from "./popup"

if ((module as any).hot) {
  /* eslint-disable global-require */
  require(`preact/debug`)
  /* eslint-enable global-require */
}

const App: preact.FunctionalComponent = () => {
  const { auth, layoutTexts } = useContext(AppContext)
  const userIsLoggedIn = auth.getCurrentUser() != null
  const { header, softKeys } = layoutTexts

  const [state, dispatch] = useReducer(SoftkeyReducer, {})
  const [popupState, setPopupState] = useState([])

  return (
    <ThemeProvider theme={KaiUI}>
      <SoftkeyContext.Provider value={{ state, dispatch }}>
        <PopupContext.Provider value={{ popupState, setPopupState }}>
          <Flex id="layout" variant="kaiui.layout">
            <Header text={header} />
            <Container
              as="main"
              sx={{
                flex: `auto`,
                position: `relative`,
              }}
            >
              {userIsLoggedIn ? <GeneralRoutes /> : <Portfolio />}
              <PopupContainer popups={popupState} />
            </Container>
            <Softkey {...state.current} />
          </Flex>
        </PopupContext.Provider>
      </SoftkeyContext.Provider>
    </ThemeProvider>
  )
}

export default App
