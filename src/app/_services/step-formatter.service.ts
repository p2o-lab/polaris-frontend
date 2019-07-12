import { Injectable } from '@angular/core';
import {ConditionOptions, ConditionType, ParameterInterface} from '@p2olab/polaris-interface';

@Injectable({
  providedIn: 'root'
})
export class StepFormatterService {

    /**
     * format parameters
     * @param {ParameterInterface[]} parameter
     * @returns {string}
     */
    parameterToString(parameter: ParameterInterface[]) {
        return parameter.map((param) => `${param.name}=${param.value}`).join(', ');
    }

    /**
     * formats transition options
     * @param {ConditionOptions} condition
     * @returns {string}
     */
    conditionToString(condition: ConditionOptions) {
        if (condition.type === ConditionType.time) {
            return `duration == ${condition.duration}`;
        }
        if (condition.type === ConditionType.state) {
            if (condition.module) {
                return `${condition.module}.${condition.service} == ${condition.state}`;
            } else {
                return `${condition.service} == ${condition.state}`;
            }
        }
        if (condition.type === ConditionType.variable) {
            let result = '';
            if (condition.module) {
                result = result.concat(condition.module, '.');
            }
            result = result.concat(condition.dataAssembly);
            if (condition.variable) {
                result = result.concat('.', condition.variable);
            }
            result = result.concat(' ', condition.operator, ' ', condition.value.toString());
            return result;
        }
        if (condition.type === ConditionType.not) {
            return `!(${this.conditionToString(condition.condition)})`;
        }
        if (condition.type === ConditionType.and) {
            return condition.conditions.map((c) => `(${this.conditionToString(c)})`).join(' && ');
        }
        if (condition.type === ConditionType.or) {
            return condition.conditions.map((c) => `(${this.conditionToString(c)})`).join(' || ');
        }
    }
}
