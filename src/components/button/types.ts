export enum ButtonTypes {
  solid,
  outlined
}

export type ButtonPropTypes = {
  label: string
  onClick: () => void
  type?: ButtonTypes
}
