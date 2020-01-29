import { h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"

import { ThemeProvider } from "theme-ui"

import Home from "../routes/home"
import Profile from "../routes/profile"
import Header from "./header"

if ((module as any).hot) {
  /* eslint-disable global-require */
  require(`preact/debug`)
  /* eslint-enable global-require */
}

const App: preact.FunctionalComponent = () => {
  let currentUrl: string
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url
  }

  const theme = {
    colors: {
      text: `#000`,
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Router onChange={handleRoute}>
        <Route path="/home" component={Home} default />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
      </Router>
    </ThemeProvider>
  )
}

export default App
