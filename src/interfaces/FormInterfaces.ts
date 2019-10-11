export interface FormProps {
    firstName: string
    lastName: string
    age: number
    agreeToTerms?: boolean
}

export interface FormState {
    fullName: string
    submitted?: boolean
    age: number
}