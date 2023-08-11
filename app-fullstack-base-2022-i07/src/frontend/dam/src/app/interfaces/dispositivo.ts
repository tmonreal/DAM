export class Dispositivo {
    dispositivoId: number;
    nombre: string;
    ubicacion: string;
    electrovalvulaId: number;

    constructor(dispositivoId_p: number, nombre_p: string, ubicacion_p: string, electrovalvulaId_p: number){
        this.dispositivoId = dispositivoId_p;
        this.nombre = nombre_p;
        this.ubicacion = ubicacion_p;
        this.electrovalvulaId = electrovalvulaId_p;
    }

    public get dispositivoId_p(): number {
        return this.dispositivoId;
    }
    public set dispositivoId_p(value: number) {
        this.dispositivoId = value;
    }

    public get nombre_p(): string {
        return this.nombre;
    }
    public set nombre_p(value: string) {
        this.nombre = value;
    }

    public get ubicacion_p(): string {
        return this.ubicacion;
    }
    public set ubicacion_p(value: string) {
        this.ubicacion = value;
    }
    
    public get electrovalvulaId_p(): number {
        return this.electrovalvulaId;
    }
    public set electrovalvulaId_p(value: number) {
        this.electrovalvulaId = value;
    }
}