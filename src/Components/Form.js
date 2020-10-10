import React, {useState} from 'react';

import styled from 'styled-components';

const DivH1= styled.div`
    display:flex;
    justify-content:center;
    font-family:'Trebuchet MS, sans-serif';
    font-weight:bold;
    margin-top:3%;
`;

const Form = () => {
    const [formState, setFormState] = useState({
        name:"",
        size:{
            small:false,
            medium:false,
            large:false,
            xLarge:false
        },
        toppings:{
            peppers:false,
            onions:false,
            pepperoni:false,
            chicken:false
        },
        specialInstructions:""
    })

    return (
        <DivH1>
            <h1>Build Your Own Pizza</h1>
        </DivH1>
    )
}

export default Form
