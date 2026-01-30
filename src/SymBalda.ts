import { Sym } from "./Sym"

export class SymBalda extends Sym<GameBalda> {
    override checkSym(sym: string): boolean {
        if (!super.checkSym(sym)) {
            return false
        }
        // Для балды допустимы русские буквы и пробел
        return sym === " " || (sym.length === 1 && /[а-яА-ЯёЁ]/.test(sym))
    }
}
