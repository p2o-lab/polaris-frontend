import {Node} from './node.model';

export interface StrategyDenorm {
    id: string;
    sid: string;
    name: string;
    default: boolean;
    sc: boolean;
    parameters: Node[];
}
