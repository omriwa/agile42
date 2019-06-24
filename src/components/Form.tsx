import React from 'react';
// interface
import { Input } from './Input';

export interface IInputDefinition {
    label: string;
    type: 'text' | 'email' | 'number' | 'date';
}

interface IInputState {
    value: string;
    valid: boolean;
}

interface IFormProps {
    formSchema: {
        inputsDefinition: IInputDefinition[]
    }
}

interface IFormState {
    inputsState: IInputState[];
    submited: boolean;
    submitedSucced: boolean;
}

export class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
        super(props);

        const inputsState = props.formSchema.inputsDefinition.map(inputDefinition => {
            return {
                value: '',
                valid: false
            }
        });
        
        this.state = {
            inputsState,
            submited: false,
            submitedSucced: false
        }
    }

    private onInputChange = (inputIndex: number, value: string, valid: boolean) => {
        console.log("value",value,"valid",valid)
        const inputsState = [...this.state.inputsState];
        const newInputState: IInputState = { value, valid }; 
        // update the value and valid for the new input
        inputsState[inputIndex] = newInputState;
        // update state
        this.setState({
            inputsState
        });
    }

    public render() {
        return <form>
            {
                this.props.formSchema.inputsDefinition
                    .map((inputDefinition: IInputDefinition, inputIndex) => <Input
                        key={inputIndex}
                        label={inputDefinition.label}
                        type={inputDefinition.type}
                        submited={this.state.submited && this.state.submitedSucced}
                        updateState={(value: any, valid: boolean) => this.onInputChange(inputIndex, value, valid)}
                        value={this.state.inputsState[inputIndex].value}
                    />)
            }
            <button>
                submit
            </button>
        </form>
    }
}