import { h } from "preact"
import { useContext } from "preact/hooks"

import { Container, Flex, ThemeProvider } from "theme-ui"

import { AppContext } from "../contexts"
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

const App: preact.FunctionalComponent = () => {
  const { auth, layoutTexts } = useContext(AppContext)
  const userIsLoggedIn = auth.getCurrentUser() != null
  const { header, softKeys } = layoutTexts

  return (
    <ThemeProvider theme={KaiUI}>
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
          {userIsLoggedIn ? <GeneralRoutes /> : <Login />}
        </Container>
        <Container as="footer">
          <SoftKey left={softKeys[0]} center={softKeys[1]} right={softKeys[2]} />
        </Container>
      </Flex>
    </ThemeProvider>
  )
}

export default App
