import { RefObject, MutableRefObject } from 'react'
import { Result, Theme } from './types'

function manageVote(
  results: Result[],
  item: Result,
  refs: MutableRefObject<RefObject<HTMLDivElement>[]>,
  theme?: Theme
): void {
  console.log("HELLOOO");
  item.votes++
  countPercentage(results)
  animateAnswers(results, refs, theme, item.optionId)
}

function animateAnswers(
  results: Result[],
  refs: MutableRefObject<RefObject<HTMLDivElement>[]>,
  theme?: Theme,
  index?: number,
  isVotedId?: number
): void {
  const answers: HTMLElement[] = []
  let restOfAnswers: Result[] = []

  for (const result of results) {
    if (index !== undefined) {
      result.optionId !== index && restOfAnswers.push(result)
    } else {
      restOfAnswers = results
    }

    const answerBuffer: HTMLElement | null = refs.current[result.optionId].current
    answerBuffer && answers.push(answerBuffer)
  }

  if (index !== undefined) {
    // animate clicked answer
    answers[index].animate(
      [
        { width: 0, easing: 'ease-out', backgroundColor: 'white' },
        {
          width: `${results[index].percentage}%`,
          easing: 'ease-out',
          backgroundColor: `${theme?.mainColor}`
        }
      ],
      500
    )
    answers[index].style.width = `${results[index].percentage}%`
    if (theme?.mainColor)
      answers[index].style.backgroundColor = theme?.mainColor
  }

  // animate rest of answers (not clicked)
  for (const ans of restOfAnswers) {
    answers[ans.optionId].animate(
      [
        { width: 0, easing: 'ease-out', backgroundColor: 'white' },
        {
          width: `${ans.percentage}%`,
          easing: 'ease-out',
          backgroundColor: `${
            ans.optionId === isVotedId ? theme?.mainColor : '#efefef'
          }`
        }
      ],
      500
    )
    answers[ans.optionId].style.width = `${ans.percentage}%`
    answers[ans.optionId].style.backgroundColor = `${
      ans.optionId === isVotedId ? theme?.mainColor : '#efefef'
    }`
  }
}

function countPercentage(results: Result[]): void {
  const votes: number[] = []
  let sum: number = 0

  for (const result of results) {
    votes.push(result.votes)
    sum += result.votes
  }

  for (let i = 0; i < votes.length; i++) {
    results[i].percentage = sum === 0 ? 0 : Math.floor((votes[i] / sum) * 100)
  }
}

export { manageVote, countPercentage, animateAnswers }
