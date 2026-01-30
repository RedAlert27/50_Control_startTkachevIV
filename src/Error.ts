export class GameError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "GameError"
    }
}

export const SymError = new GameError("Wrong symbol")
