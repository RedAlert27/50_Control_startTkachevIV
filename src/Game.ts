import { BoardParam } from "./Board"
import { SymError } from "./Error"
import { GameVC } from "./GameVC"
import { Input } from "./Input"
import { State } from "./State"

export class Game<T extends GameType> {
    steps: State<T>[]
    current: number
    boardParam: BoardParam
    input: Input<T>

    constructor(
        steps: State<T>[] | State<T>,
        input: Input<T>,
        boardParam: BoardParam,
        current: number = 0
    ) {
        if (Array.isArray(steps)) {
            this.steps = steps.map(state => state.clone())
        } else {
            this.steps = [steps.clone()]
        }
        this.current = Math.min(current, this.steps.length - 1)
        this.boardParam = boardParam
        this.input = input
    }

    get state(): State<T> {
        return this.steps[this.current].clone()
    }

    clone(): Game<T> {
        return new Game<T>(this.steps, this.input, this.boardParam, this.current)
    }

    move(index: number): boolean {
        try {
            const currentState = this.steps[this.current]
            const boardCopy = currentState.board.clone()
            const sym = this.input.sym
            
            if (!boardCopy.move(index, sym)) {
                return false
            }
            
            if (this.current < this.steps.length - 1) {
                this.steps = this.steps.slice(0, this.current + 1)
            }
            
            const nextSym = currentState.sym
            const nextState = new State<T>(boardCopy, nextSym)
            this.steps.push(nextState)
            this.current = this.steps.length - 1
            
            this.input.move()
            GameVC.draw()
            return true
        } catch (error) {
            if (error === SymError) {
                alert("Ошибка: недопустимый символ!")
            } else {
                alert("Произошла ошибка при выполнении хода!")
            }
            return false
        }
    }

    toStep(step: number): boolean {
        if (step < 0 || step >= this.steps.length) {
            return false
        }
        this.current = step
        GameVC.draw()
        return true
    }
}
