import React, { FC, Children } from 'react'

/**
    <If if={false}>
        <p>Hello World</p>
        <div>hey</div>
    <Else if={false}>
        Else component
        <p>and anything else</p>
        <Else>Hello mom</Else>
    </Else>
    </If> 
 */

const If: FC<{if: boolean, children?: any}> = (props) => {
    let result
    if(props.if){
        // return all direct children that are not in an <Else />
        result = Children.map(props.children, child => {
            if(child.props)
                return child.type.displayName !== 'Else' ? child : null
            else
                return child // used for non-tagged text
        })
        return <>{result}</>
    }else{
        // return all direct children in an <Else />, should only be one tag
        result = Children.map(props.children, child => {
            if(child.props){
                if(typeof child.type !== 'string')
                    return child.type.displayName === 'Else' ? child : null
            }
        })
        return <>{result}</>
    }
}

export const Else: FC<{if?: boolean, children?: any}> = (props) => {
    if(typeof props.if !== 'undefined'){
        // Else becomes an If, if the "if" prop is defined
        return If({ if: props.if, children: props.children }) 
    }else
        return <>{props.children}</> // return evertyhing in the else tag
}

Else.displayName = "Else"

export default If
