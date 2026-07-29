export type InstructionOption = {
  id: string
  label: string
  commission: string | null
}

export type WorkLineOption = {
  id: string
  label: string
  code: string | null
  sort_order: number | null
}

export type ObjectiveItem = {
  id: string
  legacy_id: string | null
  item_id: string | null
  commission: string | null
  instruction: string
  matter: string | null
  submatter: string | null
  work_line: string | null
  work_line_id: string | null
  work_line_sort_order: number | null
  item_objective: string | null
  item_objective_2: string | null
  status: string | null
  year: number
}

export type CommissionRecord = {
  id: string
  legacy_id: string
  name: string
}

export type InstructionRecord = {
  id: string
  legacy_id: string
  commission_id: string | null
  name: string
  name_i18n?: Record<string, string>
  legacy_instruction_id: string | null
}

export type MatterRecord = {
  id: string
  legacy_id: string
  instruction_id: string
  name: string
}

export type SubmatterRecord = {
  id: string
  legacy_id: string
  matter_id: string
  name: string
}

export type WorkLineRecord = {
  id: string
  legacy_id: string
  code: string
  display_name: string
  display_name_i18n?: Record<string, string>
  sort_order: number | null
}

export type ItemObjetivoRecord = {
  id: string
  legacy_id: string
  instruction_id: string
  submatter_id: string
  work_line_id: string
  title: string
  title_i18n?: Record<string, string>
  status: string | null
  year: number | null
  legacy_item_code: string | null
}

export type ItemObjetivoInput = {
  instruction_id: string
  submatter_id: string
  work_line_id: string
  title: string
  status: string | null
  year: number
  legacy_item_code: string | null
}

export type ItemsExportRecord = {
  item_uuid: string
  item_legacy_id: string | null
  item_code: string | null
  title: string | null
  title_i18n?: Record<string, string> | null
  status: string | null
  year: number | null
  instruction_id: string
  instruction_legacy_id: string | null
  instruction: string | null
  instruction_i18n?: Record<string, string> | null
  commission: string | null
  matter: string | null
  submatter: string | null
  work_line_id: string | null
  work_line_legacy_id: string | null
  work_line_code: string | null
  work_line: string | null
  work_line_i18n?: Record<string, string> | null
  work_line_sort_order: number | null
}
