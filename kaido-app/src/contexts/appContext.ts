import { createContext } from "preact"

import { AuthServiceInterface } from "../../../kaido-core/src/services/authService"

export interface AppContextProps {
  auth: AuthServiceInterface
}

type createContextOptions = {
  auth: AuthServiceInterface
}

const AppContext = createContext<AppContextProps>({} as AppContextProps)

export const createAppContext = ({ auth }: createContextOptions): AppContextProps => ({ auth })

export default AppContext
