import {Strategy} from './strategy.model';

export interface Service {
    id: string;
    name: string;
    communication: string[];
    strategies: string[];
    parameters: string[];
    pinned?: boolean;
}
