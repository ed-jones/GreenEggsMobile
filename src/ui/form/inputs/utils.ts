/**
 * Author: Edward Jones
 */

import { Path, PathValue } from 'react-hook-form'

// Function that converts JS numbers to strings in a way
// that avoids NaN, undefined, etc.
export function numberToString<FieldValues>(
  number: PathValue<FieldValues, Path<FieldValues>> | number | null
): string {
  if (number === NaN) {
    return ''
  }
  if (number === 0) {
    return '0'
  }
  if (number === null) {
    return ''
  }
  if (String(number) === 'NaN') {
    return ''
  }
  return String(number)
}

// Function that converts string input to numbers in a
// way that avoids NaN, undefined, etc.
export function stringToNumber(string: string): number | null {
  if (string === '') {
    return null
  }
  if (Number(string) == NaN) {
    return 0
  }
  return Number(string)
}
