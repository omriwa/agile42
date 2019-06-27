import { IInputData } from "./Input";
import { IInputState } from "./Form";

export abstract class MockApi {
    private static textValidation: (value: string) => boolean = (value) => {
        return value.length <= 20;
    }

    private static emailValidation: (value: string) => boolean = (value) => {
        const atIndex = value.indexOf('@');

        if (atIndex === -1) {
            return false;
        }
        else {
            const emailPrefix = value.substr(0, atIndex);
            return 1<= emailPrefix.length && emailPrefix.length <= 10 && value.substr(atIndex, value.length) === '@gmail.com';
        }
    }

    private static numberValidation: (value: string) => boolean = (value) => {
        const parsedValue = parseInt(value);

        return 18 <= parsedValue && parsedValue <= 60;
    }

    private static DateValidation: (value: string) => boolean = (value) => {
        const inputYear = new Date(value);

        if (inputYear.getUTCFullYear().toString().length !== 0) {
            const currentDate = new Date();
            const year = (currentDate.getUTCFullYear() - inputYear.getUTCFullYear());
            const month = (inputYear.getUTCMonth() - currentDate.getUTCMonth());
            const day = (inputYear.getUTCDay() - currentDate.getUTCDay());

            if (year > 18) {
                return true;
            }
            else if (year === 18) {
                if (month > 0) {
                    return true;
                }
                else if (month === 0) {
                    if (day >= -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }

        }
        else
            return false;

    }

    public static validatedInputArray: (inputsState: IInputData[]) => IInputState[] = (inputsState) => {
        return inputsState.map(input => {
            return {
                value: input.value,
                valid: MockApi.validateInput(input)
            }
        });
    }

    private static validateInput: (input: IInputData) => boolean = (input) => {
        switch (input.type) {
            case 'text':
                return MockApi.textValidation(input.value);
            case 'email':
                return MockApi.emailValidation(input.value);
            case 'number':
                return MockApi.numberValidation(input.value);
            case 'date':
                return MockApi.DateValidation(input.value);
        }
    }
}