export enum ButtonTypes {
  solid,
  outlined
}

export interface ButtonPropTypes {
  label: string
  onClick: () => void
  type?: ButtonTypes
}
