export interface Theme {
    mainColor?: string // multiple poll only
    textColor?: string
    backgroundColor?: string
    alignment?: string
}
  
export interface Result {
    _id: string
    optionId: number
    text: string
    votes: number
    percentage?: number
}
  
export interface MultiplePollProps {
    question: string
    results: Result[]
    theme?: Theme
    isVoted?: boolean
    isVotedId?: number
    onVote?(item: Result): void
    error: string
}