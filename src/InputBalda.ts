import { Input } from "./Input"
import { SymTic } from "./SymTic"

export class InputTic extends Input<GameTic> {
    private static x = new SymTic("X")
    private static o = new SymTic("0")
    private _sym: SymTic

    constructor() {
        super()
        this._sym = InputTic.x
    }

    get sym(): SymTic {
        return this._sym
    }

    move(): void {
        this._sym = this._sym === InputTic.x ? InputTic.o : InputTic.x
    }
}
