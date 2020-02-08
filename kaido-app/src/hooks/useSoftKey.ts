import { useContext, useEffect } from "preact/hooks"

import { SoftkeyContext, SoftkeyInterface } from "../contexts"

export const useSoftkey = (
  origin: string,
  config: SoftkeyInterface | null = null,
  dependencies = [],
  replace = false
) => {
  const softkey = useContext(SoftkeyContext)
  useEffect(() => {
    softkey.dispatch({ type: `push`, origin })
    return () => softkey.dispatch({ type: `pop`, origin })
  }, [origin])

  useEffect(() => {
    if (config) {
      const type = replace ? `replace` : `set`
      softkey.dispatch({ type, config })
    }
  }, dependencies)
  return softkey
}
