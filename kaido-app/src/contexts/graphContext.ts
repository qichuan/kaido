import { createContext } from "preact"
import { GraphServiceInterface } from "../../../kaido-core/src/services"

export interface GraphContextProps {
  graph: GraphServiceInterface
}

export const GraphContext = createContext<GraphContextProps>({} as GraphContextProps)
