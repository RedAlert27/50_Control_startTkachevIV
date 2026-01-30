import { Sym } from "./Sym"

export type BoardParam = {
    row: number,
    col: number
}

export abstract class Board<T extends GameType> {
    cells: Sym<T>[]
    static row: number = 0
    static col: number = 0

    constructor(
        str: Sym<T>[],
        row?: number,
        col?: number,
    ) {
        // Инициализация статических полей
        if (row !== undefined) {
            ;(this.constructor as any).row = row
        }
        if (col !== undefined) {
            ;(this.constructor as any).col = col
        }
        
        // Инициализация cells
        this.cells = str.map(sym => sym.clone())
    }

    abstract clone(): Board<T>

    isFill(): boolean {
        return this.cells.every(cell => cell.sym !== "_" && cell.sym !== " ")
    }

    move(index: number, sym: Sym<T>): boolean {
        if (index < 0 || index >= this.cells.length) {
            return false
        }
        if (this.cells[index].sym !== "_" && this.cells[index].sym !== " ") {
            return false
        }
        this.cells[index] = sym.clone()
        return true
    }

    status(): string {
        return this.isFill() ? "Игра закончена" : "Идет игра"
    }
}
