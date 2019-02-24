import { IVeiculoDTO } from './../Interfaces/iveiculo-dto';
export class VeiculoDTO implements IVeiculoDTO {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: any[];
    films: string[];    
    url: string;
}
