
import { useReducer } from "react";


export const useInput = (validateState) => {

  const initialFormState={
      value: '',
      isTouched: false
  }

    const funcReducer=(prev,action)=>{
        console.log(prev);
        console.log(action.value);
        if(action.type === 'VALUE'){ 
            console.log(action.value);
            return {
                ...prev,
                value: action.value,
            }      
        }
        if(action.type === 'BLUR'){
            return{
                ...prev,
                isTouched: true
            }
        }
        return {
            prev
        }
    }


    const [inpValue, dispatchValue] = useReducer(funcReducer,initialFormState)
  
    const valueIsValid = validateState(inpValue.value) // true || false
    const hasError = !valueIsValid && inpValue.isTouched 

    const valueChangeHandler=(e)=>{
        dispatchValue({type: 'VALUE', value: e.target.value})
    }

const inputBlurHandler = (event) => {
    dispatchValue({type: 'BLUR'})
}

  return {
      value: inpValue.value,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
  }

};
export default useInput