import React from 'react';
// interface
import { Input, IInputData } from './Input';
// style
import { FormStyledComponent, Button } from './FormStyle';
import { MockApi } from './MockApi';

export interface IInputDefinition {
    label: string;
    type: 'text' | 'email' | 'number' | 'date';
}

export interface IInputState {
    value: string;
    valid: boolean;
}

export interface IFormProps {
    formSchema: {
        inputsDefinition: IInputDefinition[]
    },
    successUrl: string;
}

interface IFormState {
    inputsState: IInputState[];
    submited: boolean;
    submitedSucceed: boolean;
}

export class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
        super(props);

        const inputsState = props.formSchema.inputsDefinition.map(() => {
            return {
                value: '',
                valid: true
            }
        });
        
        this.state = {
            inputsState,
            submited: false,
            submitedSucceed: false
        }
    }

    private onInputChange = (inputIndex: number, value: string) => {
        const inputsState = [...this.state.inputsState];
        const newInputState: IInputState = { value, valid: false }; 
        // update the value and valid for the new input
        inputsState[inputIndex] = newInputState;
        // update state
        this.setState({
            inputsState
        });
    }

    private onSubmit = (e: React.FormEvent) => {
        const inputArray: IInputData[] = this.state.inputsState.map((input,inputIndex) => {
            return {
                value: input.value,
                type: this.props.formSchema.inputsDefinition[inputIndex].type
            }
        });
        const inputsState: IInputState[] = MockApi.validatedInputArray(inputArray);
        var submitedSucceed = inputsState.findIndex(input => !input.valid) === -1;

        e.preventDefault();
 
        // update app state
        this.setState({
            submited: true,
            submitedSucceed,
            inputsState
        },
            () => {
                if (this.state.submitedSucceed) {
                    window.location.pathname = window.location.pathname.substr(0, window.location.pathname.length - 2) + this.props.successUrl;
                }
            }
        );
    }

    private renderInputs: () => React.ReactElement[] = () => {
        return this.props.formSchema.inputsDefinition
            .map((inputDefinition: IInputDefinition, inputIndex) => < Input
                key={inputIndex}
                label={inputDefinition.label}
                type={inputDefinition.type}
                updateValue={(value: any) => this.onInputChange(inputIndex, value)}
                value={this.state.inputsState[inputIndex].value}
                show={
                    !this.state.submited
                    ||
                    this.state.submited && !this.state.submitedSucceed && !this.state.inputsState[inputIndex].valid
                }
            />);
    }

    public render() {
        return !this.state.submitedSucceed
            ?
            < FormStyledComponent >
            <div className="form-error">
                {
                    this.state.submited && !this.state.submitedSucceed ? "Some fields were not correctly filled" : ""
                }
            </div>
            {
                this.renderInputs()
            }
            <br />
            <Button
                onClick={this.onSubmit}
            >
                submit
            </Button>
        </FormStyledComponent>
            :
            null;
    }
}