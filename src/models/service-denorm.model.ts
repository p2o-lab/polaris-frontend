import { Node } from './node.model';
import { StrategyDenorm } from './strategy-denorm.model';
import { Strategy } from './strategy.model';

export interface ServiceDenorm {
    id: string;
    name: string;
    communication: Node[];
    strategies: Strategy[] | StrategyDenorm[];
    parameters: Node[];
}
