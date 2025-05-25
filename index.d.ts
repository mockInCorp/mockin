export interface IConfirmParams {
  title: string
  description?: string
  onConfirm: () => void
}

export type TToastLevel = 'SUCCESS' | 'WARNING' | 'INFO' | 'ERROR'
export interface IToastParams {
  level: TToastLevel
  title: string
  subtitle?: string
}

declare global {
  interface Window {
    confirmModal: (params: IConfirmParams) => void
    toast: (params: IToastParams) => void
  }
}
