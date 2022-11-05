/**
 * Author: Edward Jones
 */
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

interface TValidate<TInputType extends FieldValues> {
  form: UseFormReturn<TInputType>
  validate: FieldPath<TInputType>[] | FieldPath<TInputType>
  register: FieldPath<TInputType>
  onValid: () => void
}

/**
 * Function that will partially validate a react-hook-form form
 */
export const partialValidate = <TInputType extends FieldValues>({
  form,
  validate,
  register,
  onValid,
}: TValidate<TInputType>): void => {
  void form.trigger(validate).then((isValid) => {
    if (isValid) {
      form.register(register, {
        value: form.getValues(register),
      })
      onValid()
    }
  })
}
