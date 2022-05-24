import {ObjectErrors, ObjectRules, ObjectValidator, RuleType} from "./index";
import {isUndefined} from "lodash-es";

const validator = <T>(rules: ObjectRules<T>): ObjectValidator<T> => {
    return async (object: T) => {
        const errors: ObjectErrors<T> = {}
        for (const field in Object.keys(rules)) {
            for (const rule in Object.keys(rules[field])) {

            }
        }
        return undefined
    }
}

const validate = (rule: string, parameter: boolean, value?: any): boolean => {
    switch (rule) {
        case RuleType.REQUIRED:
            return !isUndefined(value)
        case RuleType.VALUES:
            return
    }
}

export default validator
