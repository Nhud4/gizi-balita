import { useMemo, useState } from 'react'
import { ActionMeta, MultiValue, SingleValue } from 'react-select'

export const formatValue = (option: unknown) => {
  const selected = option as Record<string, unknown>
  return Array.isArray(selected)
    ? selected.map((item) => item.value).join(',')
    : selected.value
}

export default function useFilter(initialFilter: Record<string, unknown>) {
  const [selected, setSelected] = useState(initialFilter)

  const params = useMemo(() => {
    const entries = Object.entries(selected).map((item) => ({
      [item[0]]: formatValue(item[1]) || '',
    }))
    const result = Object.assign({}, ...entries)
    return result
  }, [selected])

  const onChangeFilter = (
    option: SingleValue<SelectOption> | MultiValue<SelectOption>,
    { name }: ActionMeta<SelectOption>
  ) => {
    if (!option) return
    const temp = { ...selected }
    const key = name as keyof typeof temp
    temp[key] = option
    setSelected(temp)
  }

  return { onChangeFilter, selected, params }
}
