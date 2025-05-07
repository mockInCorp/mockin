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
