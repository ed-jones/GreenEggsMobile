/**
 * Author: Edward Jones
 *
 * This file contains a list of commonly used icons within Green Eggs.
 * Simplifies the use of icons in UI Kitten components.
 */
import { ReactElement } from 'react';
import { Icon, IconProps } from '@ui-kitten/components'

export function Settings(props: IconProps) {
  return <Icon {...props} name='settings-outline' />
}

export function Back(props: IconProps): ReactElement {
  return <Icon {...props} name='chevron-left-outline' />
}

export function Forward(props: IconProps): ReactElement {
  return <Icon {...props} name='chevron-right-outline' />
}

export function Down(props: IconProps): ReactElement {
  return <Icon {...props} name='chevron-down-outline' />
}

export function Warning(props: IconProps): ReactElement {
  return <Icon {...props} name='alert-triangle' />
}

export function Publish(props: IconProps): ReactElement {
  return <Icon {...props} name='upload-outline' />
}

export function Add(props: IconProps): ReactElement {
  return <Icon {...props} name='plus-outline' />
}

export function Edit(props: IconProps): ReactElement {
  return <Icon {...props} name='edit-outline' />
}

export function AddPerson(props: IconProps): ReactElement {
  return <Icon {...props} name='person-add-outline' />
}

export function More(props: IconProps): ReactElement {
  return <Icon {...props} name='more-horizontal' />
}

export function Camera(props: IconProps): ReactElement {
  return <Icon {...props} name='camera-outline' />
}

export function Image(props: IconProps): ReactElement {
  return <Icon {...props} name='image-outline' />
}

export function Cross(props: IconProps): ReactElement {
  return <Icon {...props} name='close-outline' />
}

export function Search(props: IconProps): ReactElement {
  return <Icon {...props} name='search' />
}

export function Save(props: IconProps): ReactElement {
  return <Icon {...props} name='save' />
}

export function Trash(props: IconProps): ReactElement {
  return <Icon {...props} name='trash-2-outline' />
}

export function Comment(props: IconProps): ReactElement {
  return <Icon {...props} name='message-square-outline' />
}

export function Reply(props: IconProps): ReactElement {
  return <Icon {...props} name='undo-outline' />
}

export function Bookmark(props: IconProps): ReactElement {
  return <Icon {...props} name='bookmark-outline' />
}

export function Filter(props: IconProps): ReactElement {
  return <Icon {...props} name='options-2-outline' />
}
