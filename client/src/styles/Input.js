import styled from 'styled-components'

//form input
export const Input = styled.input`
    border: ${props => props.border ? props.border : '1px solid #D9D7D7'};
    width: 40rem;
    height: 4rem;
    border-radius: 6px;
    margin-top: 1.1rem;
    padding: 0 0.8rem;
    font-size: 1.7rem;
    font-weight: 300;
    color: #9B9B9B;
    outline: 0;
    transition: border .2s ease;

    ::placeholder {
        color: #DBD9DC;
    }

    :focus {
        border: 1px solid #9B9B9B;
    }
`

//form textarea

export const Textarea = styled.textarea`
    border: ${props => props.border ? props.border : '1px solid #D9D7D7'};
    width: 40rem;
    border-radius: 6px;
    margin-top: 1.1rem;
    padding: 1rem;
    font-size: 1.7rem;
    font-weight: 300;
    color: #9B9B9B;
    outline: 0;
    transition: border .2s ease;

    ::placeholder {
        color: #DBD9DC;
    }

    :focus {
        border: 1px solid #9B9B9B;
    }
`

//select

export const Select = styled.select`
    border: ${props => props.border ? props.border : '1px solid #D9D7D7'};
    width: 40rem;
    border-radius: 6px;
    margin-top: 1.1rem;
    padding: 0 0.8rem;
    font-size: 1.7rem;
    font-weight: 300;
    color: #9B9B9B;
    outline: 0;
    transition: border .2s ease;

    ::placeholder {
        color: #DBD9DC;
    }

    :focus {
        border: 1px solid #9B9B9B;
    }
`