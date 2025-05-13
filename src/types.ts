export interface IInterviewCache {
  id: string
  question: string
  isFinished: boolean
  answerCount: number
  maxAnswerCount: number
}
export interface IInterviewQuestionFeedback {
  clarity: number
  conciseness: number
  confidence: number
  isRevelant: boolean
  structure: number
}

export type TInterviewStatus = 'IN_PROGRESS' | 'FINISHED' | 'GIVEN_UP'
export interface IAnswerFeedback {
  clarity: number
  conciseness: number
  confidence: number
  isRevelent: boolean
  structure: number
}

export interface IContact {
  givenName: string
  id: string
  familyName: string
}

export interface IInterviewQuestion {
  question: string
  feedback: IAnswerFeedback
}
export interface IInterview {
  id: string
  contact: IContact

  status: TInterviewStatus

  startedAt: Date
  endedAt: Date

  questions: IInterviewQuestion[]

  globalFeedback: IAnswerFeedback
  feedbackComment: string
}

export interface ITheme {
  id: string
  displayName: string
}

export type TAuthProvider = 'google'
