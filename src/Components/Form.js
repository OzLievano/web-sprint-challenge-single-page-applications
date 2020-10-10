import React, {useState,useEffect} from 'react';
import pizzaPhoto from '../pizzaPhoto.jpg';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';

const DivH1= styled.div`
    display:flex;
    justify-content:center;
    font-family:'Trebuchet MS, sans-serif';
    font-weight:bold;
    margin-top:3%;
`;

const divH4 = styled.div`
    background-color:'pink';
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

    const [errors,setErrors]= useState({
        name:""
    });

    const [isDisabled,setIsDisabled] = useState(true);

    // inputChange fuction 
    const handleChanges = (e) => {
        if(e.target.type==='checkbox'){
            setFormState({...formState,toppings:{
                ...formState.additions,[e.target.value]:e.target.checked
            }})
        }else{
            setFormState({...formState,[e.target.name]:e.target.value})
        }if (e.target.name==="name"){
            validate(e)
        }

    }
    // useEffect to change button

    useEffect(()=>{
        formSchema.isValid(formState).then(valid => setIsDisabled(!valid))
    },[formState])

    //submitForm function 
    const submitForm = (e)=>{
        e.preventDefault();
        axios.post("https://reqres.in/api/users",formState)
        .then(resp=>{
            console.log(formState)
        })
    }
    //formSchema
    const formSchema = yup.object().shape({
        name:yup.string().required('Name is required').min(2,'That is not a valid input')
    })

    //validate changes 

    const validate = (e) =>{
        e.persist()
        yup.reach(formSchema,e.target.name).validate(e.target.value)
        .then(valid => setErrors({...errors,[e.target.name]:''}))
        .catch(err => setErrors({...errors,[e.target.name]:err.errors[0]}))
    }

    return (
        <div>
            <DivH1>
                <h1>Build Your Own Pizza</h1>
            </DivH1>
            <div className="img-container">
                <img src={pizzaPhoto} alt="myPizza"/>
            </div>
            <div className="form-container">
                <form onSubmit={submitForm}>
                <h3>Build Your Own Pizza</h3><br/>
                    <label htmlFor="name">
                        <h3>Full Name</h3>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            data-cy="name"
                            onChange={handleChanges}
                        />
                    </label><br/>
                    <label>
                        <h3>Pizza Size</h3>
                        <select 
                            id="size" 
                            name="size" 
                            defaultValue="small" 
                            data-cy="size"
                            onChange={handleChanges}
                        >
                            <option 
                                data-cy="small" 
                                value="small">Small
                            </option>
                            <option 
                                data-cy="medium" 
                                value="medium">Medium
                            </option>
                            <option 
                                data-cy="large" 
                                value="large">Large
                            </option>
                            <option 
                                data-cy="xLarge" 
                                value="xLarge">X-Large
                            </option>
                        </select>
                    </label><br/>
                    <label>
                        <h3>Toppings</h3>
                        <input 
                            type="checkbox"
                            name="peppers"
                            data-cy="peppers"
                            value="peppers"
                        />
                        Peppers<br/>
                        <input 
                            type="checkbox"
                            name="onions"
                            data-cy="onions"
                            value="onions"
                            onChange={handleChanges}
                        />
                        Onions<br/>
                        <input 
                            type="checkbox"
                            name="pepperoni"
                            data-cy="pepperoni"
                            value="pepperoni"
                            onChange={handleChanges}
                        />
                        Pepperoni<br/>
                        <input 
                            type="checkbox"
                            name="chicken"
                            data-cy="chicken"
                            value="chicken"
                            onChange={handleChanges}
                        />
                        Chicken<br/>
                    </label><br/>
                    <label><h3>Special Instructions</h3>
                    <textarea name="specialInstructions" data-cy="specialInstructions" placeholder="Please add any special instructions" value={formState.specialInstructions} onChange={handleChanges}></textarea>
                </label><br/>
                <button type="submit" disabled={isDisabled}>Order Your Pizza</button>
                </form>
            </div>
            <pre>{JSON.stringify(formState, null, 2)}</pre>
        </div>
    )
}

export default Form
