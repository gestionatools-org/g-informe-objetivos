"use client"

import { useEffect, useState } from "react"
import { fetchItemsForInstructionAndWorkLine } from "@/lib/supabase/queries"
import type { ObjectiveItem } from "@/lib/supabase/types"

type UseObjectiveItemsOptions = {
  enabled?: boolean
  fallback?: ObjectiveItem[]
}

export const useObjectiveItems = (
  instructionId: string,
  workLineId: string,
  options: UseObjectiveItemsOptions = {},
) => {
  const { enabled = true, fallback = [] } = options
  const shouldFetch = enabled && Boolean(instructionId) && Boolean(workLineId)
  const requestKey = shouldFetch
    ? `${instructionId}:${workLineId}`
    : "disabled"
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
    if (!shouldFetch) {
      return
    }

    let active = true
    fetchItemsForInstructionAndWorkLine(instructionId, workLineId)
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
  }, [instructionId, requestKey, shouldFetch, workLineId])

  if (!shouldFetch) {
    return { data: fallback, error: null, loading: false }
  }

  return {
    data: state.data,
    error: state.error,
    loading: state.requestKey !== requestKey,
  }
}
