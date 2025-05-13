export interface IConfirmParams {
  title: string
  description?: string
  onConfirm: () => void
}

declare global {
  interface Window {
    confirmModal: (params: IConfirmParams) => void
  }
}
