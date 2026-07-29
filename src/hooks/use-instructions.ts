"use client"

import { useEffect, useState } from "react"
import { fetchInstructions } from "@/lib/supabase/queries"
import type { InstructionOption } from "@/lib/supabase/types"

type UseInstructionsOptions = {
  enabled?: boolean
  fallback?: InstructionOption[]
}

export const useInstructions = (options: UseInstructionsOptions = {}) => {
  const { enabled = true, fallback = [] } = options
  const requestKey = enabled ? "instructions" : "disabled"
  const [state, setState] = useState<{
    data: InstructionOption[]
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
    fetchInstructions()
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
