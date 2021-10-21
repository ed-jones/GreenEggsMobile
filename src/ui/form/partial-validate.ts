/**
 * Author: Edward Jones
 */
import { FieldPath, UseFormReturn } from "react-hook-form";

interface IValidate<InputType> {
  form: UseFormReturn<InputType>;
  validate: FieldPath<InputType>[] | FieldPath<InputType>;
  register: FieldPath<InputType>;
  onValid: () => void;
}

export const partialValidate = <InputType>({form, validate, register, onValid }: IValidate<InputType>) => {
  form.trigger(validate).then((isValid) => {
      if (isValid) {
        form.register(register, {
          value: form.getValues(register),
        });
        onValid();
      }
    }
  );
}
