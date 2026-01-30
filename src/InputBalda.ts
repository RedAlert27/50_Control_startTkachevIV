import { Input } from "./Input"
import { SymBalda } from "./SymBalda"

export class InputBalda extends Input<GameBalda> {
    override get html(): string {
        return "<input id='inputBalda' placeholder='Введите букву'></input>"
    }

    get sym(): SymBalda {
        try {
            const inputElement = document.getElementById('inputBalda') as HTMLInputElement
            const value = inputElement ? inputElement.value.charAt(0) || ' ' : ' '
            return new SymBalda(value)
        } catch (error) {
            return new SymBalda(' ')
        }
    }

    move(): void {
        const inputElement = document.getElementById('inputBalda') as HTMLInputElement
        if (inputElement) {
            inputElement.value = ''
        }
    }
}
