"use client"

import { useEffect, useState } from "react"
import { fetchWorkLinesForInstruction } from "@/lib/supabase/queries"
import type { WorkLineOption } from "@/lib/supabase/types"

type UseWorkLinesOptions = {
  enabled?: boolean
  fallback?: WorkLineOption[]
}

export const useWorkLines = (
  instructionId: string,
  options: UseWorkLinesOptions = {},
) => {
  const { enabled = true, fallback = [] } = options
  const shouldFetch = enabled && Boolean(instructionId)
  const requestKey = shouldFetch ? instructionId : "disabled"
  const [state, setState] = useState<{
    data: WorkLineOption[]
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
    fetchWorkLinesForInstruction(instructionId)
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
  }, [instructionId, requestKey, shouldFetch])

  if (!shouldFetch) {
    return { data: fallback, error: null, loading: false }
  }

  return {
    data: state.data,
    error: state.error,
    loading: state.requestKey !== requestKey,
  }
}
