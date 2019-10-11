import React from 'react'
import { FormProps } from '../interfaces/FormInterfaces'

export const MyForm: React.FC<FormProps> = ({firstName, lastName, age}) => {
    return (
        <div>
            {firstName}
            <br />
            {lastName}
            <br />
            {age}
        </div>
    )
}
