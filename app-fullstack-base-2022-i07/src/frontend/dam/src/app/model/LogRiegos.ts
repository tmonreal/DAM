export class LogRiegos {
    private _logRiegoId: number;
    private _apertura: number;
    private _fecha: string;
    private _electrovalvulaId: number;

    constructor(logRiegoId: number, apertura: number, fecha: string, electrovalvulaId: number) {
        this._logRiegoId = logRiegoId;
        this._apertura = apertura;
        this._fecha = fecha;
        this._electrovalvulaId = electrovalvulaId;
    }

    public get logRiegoId(): number {
        return this._logRiegoId;
    }
    public set logRiegoId(value: number) {
        this._logRiegoId = value;
    }
    public get apertura(): number {
        return this._apertura;
    }
    public set apertura(value: number) {
        this._apertura = value;
    }
    public get fecha(): string {
        return this._fecha;
    }
    public set fecha(value: string) {
        this._fecha = value;
    }
    public get electrovalvulaId(): number {
        return this._electrovalvulaId;
    }
    public set electrovalvulaId(value: number) {
        this._electrovalvulaId = value;
    }

}