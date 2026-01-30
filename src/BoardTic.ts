import { Board, BoardParam } from "./Board"
import { SymTic } from "./SymTic"

export class BoardTic extends Board<GameTic> {
    constructor(
        str: string | SymTic[] = "_________",
        init: boolean = true
    ) {
        // Преобразование входных данных
        let cells: SymTic[]
        if (Array.isArray(str)) {
            cells = str
        } else {
            if (str.length !== 9) {
                str = "_________"
            }
            cells = SymTic.StringToSyms<GameTic>(str)
        }

        // Инициализация статических полей
        if (init) {
            ;(BoardTic as any).row = BoardTicParam.row
            ;(BoardTic as any).col = BoardTicParam.col
        }

        super(cells, BoardTicParam.row, BoardTicParam.col)
    }

    clone(): BoardTic {
        return new BoardTic([...this.cells], false)
    }

    private getLineChar(line: number[]): string[] {
        return [
            this.cells[line[0]].sym,
            this.cells[line[1]].sym,
            this.cells[line[2]].sym,
        ]
    }

    private static winPos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    private checkWin(): string {
        for (const line of BoardTic.winPos) {
            const [a, b, c] = this.getLineChar(line)
            if (a !== "_" && a === b && b === c) {
                return a
            }
        }
        return "_"
    }

    override status(): string {
        const winner = this.checkWin()
        if (winner !== "_") {
            return `Победил: ${winner}`
        }
        if (this.isFill()) {
            return "Ничья!"
        }
        return super.status()
    }
}

export const BoardTicParam: BoardParam = {
    row: 3,
    col: 3
}
