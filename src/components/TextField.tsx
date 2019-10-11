import React, { useState, useRef } from 'react'
import If, { Else } from './If'

interface Person {
    firstName: string,
    lastname: string
}

interface Props {
    text: string,
    ok?: boolean,
    i?: number,
    fn?: (bob: string) => void,
    obj?: {
        f1: string
    },
    person?: Person
}

const TextField: React.FC<Props> = ({text}) => {
    const [count, setCount] = useState<number | null>(5)
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div>
            {text}
            <br />
            <input type="text" ref={inputRef} />
            <br />

            <If if={false}>
                <p>Hello World</p>
                <div>hey</div>
            <Else if={false}>
                Else component
                <p>and anything else</p>
                <Else>Hello mom</Else>
            </Else>
            </If> 
        </div>
    )
}

const Test: React.FC<Props> = ({text}) => {
    return <div>Hello</div>
}

export default TextField
