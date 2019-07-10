import { Path } from './path.model';

export interface Connection {
    start: string;
    target: string;
    path: Path[];
}
