import { IPlanetaDTO } from './../Interfaces/iplaneta-dto';
export class PlanetaDTO implements IPlanetaDTO {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    url: string;
}
