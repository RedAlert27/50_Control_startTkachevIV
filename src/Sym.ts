import { SymError } from "./Error"

export class Sym<T extends GameType> {
    private field: string = ""

    constructor(sym: string = "_") {
        if (!this.checkSym(sym)) {
            throw SymError
        }
        this.field = sym
    }

    make(sym: string): Sym<T> {
        return new Sym(sym)
    }

    clone(): Sym<T> {
        return this.make(this.field)
    }

    checkSym(sym: string): boolean {
        return sym.length === 1
    }

    get sym(): string {
        return this.field
    }

    static StringToSyms<T extends GameType>(str: string): Sym<T>[] {
        const result: Sym<T>[] = []
        for (let i = 0; i < str.length; i++) {
            result.push(new Sym(str[i]))
        }
        return result
    }

    static SymsToString<T extends GameType>(syms: Sym<T>[]): string {
        let result: string = ""
        for (let i = 0; i < syms.length; i++) {
            result = result + syms[i].sym
        }
        return result
    }
}
