/**
 * Author: Edward Jones
 */
import { IndexPath, SelectItem } from '@ui-kitten/components'
import { ReactElement } from 'react';
import { FieldError, FieldValues, Path, PathValue } from 'react-hook-form'
import { Privacy } from '@greeneggs/types/graphql'
import { Select } from '@greeneggs/ui/select'

interface IPrivacySelect {
  label?: string
  caption?: string
  value: PathValue<FieldValues, Path<FieldValues>>
  onChange: (...event: unknown[]) => void
  placeholder?: string
  error?: FieldError
}
interface Option {
  title: string
  value: Privacy
}
const options: Option[] = [
  { title: 'EVERYONE', value: Privacy.PUBLIC },
  { title: 'FRIENDS', value: Privacy.FRIENDS },
  { title: 'ONLY ME', value: Privacy.PRIVATE },
]

/**
 * Input component for selecting a privacy option
 */
export function PrivacySelect({ label, caption, value, onChange, placeholder, error }: IPrivacySelect): ReactElement {
  return (
    <Select
      status={error ? 'danger' : undefined}
      value={options.find((option) => option.value === value)?.title || placeholder || 'SELECT OPTION'}
      style={{ marginBottom: 16 }}
      selectedIndex={new IndexPath(options.findIndex((option) => option.value === value))}
      onSelect={(index) => (!Array.isArray(index) ? onChange(options[index.row].value) : undefined)}
      label={label}
      caption={error?.message || caption}
    >
      {options.map((option) => (
        <SelectItem title={option.title} key={option.title} />
      ))}
    </Select>
  )
}
