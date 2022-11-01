/**
 * Author: Edward Jones
 */
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

interface IValidate<InputType extends FieldValues> {
  form: UseFormReturn<InputType>
  validate: FieldPath<InputType>[] | FieldPath<InputType>
  register: FieldPath<InputType>
  onValid: () => void
}

/**
 * Function that will partially validate a react-hook-form form
 */
export const partialValidate = <InputType extends FieldValues>({
  form,
  validate,
  register,
  onValid,
}: IValidate<InputType>): void => {
  void form.trigger(validate).then((isValid) => {
    if (isValid) {
      form.register(register, {
        value: form.getValues(register),
      })
      onValid()
    }
  })
}
