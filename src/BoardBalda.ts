import { Board, BoardParam } from "./Board"
import { SymBalda } from "./SymBalda"

export class BoardBalda extends Board<GameBalda> {
    constructor(
        str: string | SymBalda[] = "балда",
        init: boolean = true
    ) {
        // Преобразование входных данных
        let cells: SymBalda[]
        if (Array.isArray(str)) {
            cells = str
        } else {
            if (str.length === 5) {
                str = "          " + str + "          "
            }
            cells = SymBalda.StringToSyms<GameBalda>(str)
        }

        // Инициализация статических полей
        if (init) {
            ;(BoardBalda as any).row = BoardBaldaParam.row
            ;(BoardBalda as any).col = BoardBaldaParam.col
        }

        super(cells, BoardBaldaParam.row, BoardBaldaParam.col)
    }

    clone(): BoardBalda {
        return new BoardBalda([...this.cells], false)
    }
}

export const BoardBaldaParam: BoardParam = {
    row: 5,
    col: 5
}
