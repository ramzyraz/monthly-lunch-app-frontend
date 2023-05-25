import { useState, useEffect, useRef, createRef, RefObject } from 'react'
import { manageVote, countPercentage, animateAnswers } from './utils'
import { MultiplePollProps } from './types'
import styles from './MultiplePoll.module.css'

const MultiplePoll = ({
  question,
  results,
  theme,
  onVote,
  isVoted,
  isVotedId,
  error
}: MultiplePollProps) => {
  const [voted, setVoted] = useState<boolean>(false);
  const answerRefs = useRef<RefObject<HTMLDivElement>[]>(
    results.map(() => createRef<HTMLDivElement>())
  )

  useEffect(() => {
    if (isVoted) {
      countPercentage(results);
      animateAnswers(results, answerRefs, theme, undefined, isVotedId);
      setVoted(true);
    }
  }, []);

  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor, fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>{question}</h1>}

      {results.map((result) => (
        <div
          key={result._id}
          role='button'
          id={'mulAnswer' + result._id}
          className={
            voted ? styles.answer : styles.answer_hover + ' ' + styles.answer
          }
          style={{
            backgroundColor: theme?.backgroundColor
          }}
          onClick={() => {
            if (!voted) {
              setVoted(true)
              onVote?.(result)
              manageVote(results, result, answerRefs, theme)         
            }
          }}
        >
          <div
            ref={answerRefs.current[result.optionId]}
            className={styles.answerInner}
          >
            <p style={{ color: theme?.textColor, whiteSpace: "nowrap" }}>{result.text}</p>
          </div>
          {voted && (
            <span style={{ color: theme?.textColor }}>
              {result.votes}
            </span>
          )}
        </div>
      ))}
      {error && <p className="error-msg">{error}</p>}
    </article>
  )
}

export default MultiplePoll;