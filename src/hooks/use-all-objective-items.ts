"use client"

import { useEffect, useState } from "react"
import { fetchAllObjectiveItems } from "@/lib/supabase/queries"
import type { ObjectiveItem } from "@/lib/supabase/types"

type UseAllObjectiveItemsOptions = {
  enabled?: boolean
  fallback?: ObjectiveItem[]
}

export const useAllObjectiveItems = (options: UseAllObjectiveItemsOptions = {}) => {
  const { enabled = true, fallback = [] } = options
  const requestKey = enabled ? "all-objective-items" : "disabled"
  const [state, setState] = useState<{
    data: ObjectiveItem[]
    error: Error | null
    requestKey: string
  }>({
    data: fallback,
    error: null,
    requestKey: "",
  })

  useEffect(() => {
    if (!enabled) {
      return
    }

    let active = true
    fetchAllObjectiveItems()
      .then((items) => {
        if (!active) return
        setState({ data: items, error: null, requestKey })
      })
      .catch((err: Error) => {
        if (!active) return
        setState({ data: [], error: err, requestKey })
      })

    return () => {
      active = false
    }
  }, [enabled, requestKey])

  if (!enabled) {
    return { data: fallback, error: null, loading: false }
  }

  return {
    data: state.data,
    error: state.error,
    loading: state.requestKey !== requestKey,
  }
}
