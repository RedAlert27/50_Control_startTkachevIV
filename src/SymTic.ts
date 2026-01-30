import { Sym } from "./Sym"

export class SymTic extends Sym<GameTic> {
    override checkSym(sym: string): boolean {
        if (!super.checkSym(sym)) {
            return false
        }
        return sym === "_" || sym === "X" || sym === "0"
    }
}
