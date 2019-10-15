// tslint:disable: jsx-no-multiline-js
import React, {useState, useMemo} from 'react'
import {useFetch} from './useFetch'

const computeLongestWord = (arr: {quote: string}) => {
    if(!arr) return []

    console.log('computing longest word')
    let longestWord: string = ''

    arr.quote.split(' ').forEach((word: string) => {
        if(word.length > longestWord.length)
            longestWord = word
    })
    return [arr.quote, longestWord]
}

const KanyeRest: React.FC = () => {
    const [count, setCount] = useState<number>(0)
    const {data} = useFetch('https://api.kanye.rest')
    const [sentence, longestWord] = useMemo(() => computeLongestWord(data), [data])
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <br />
            {count}
            <br />
            {sentence}
            <br />
            {longestWord}
        </div>
    )
}

export default KanyeRest
