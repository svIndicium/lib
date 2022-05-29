import { FieldErrors, ObjectErrors, ObjectRules, ObjectValidator } from "../validation";
import { isDate, isEmpty, isNumber, isString, isUndefined } from "lodash-es";

const validator = <T>(rules: ObjectRules<T>): ObjectValidator<T> => {
    return async (object: T) => {
        const errors: ObjectErrors<T> = {}
        for (const fieldString of Object.keys(rules)) {
            const fieldName = fieldString as keyof T
            const fieldRules = rules[fieldName]
            const fieldError: FieldErrors = []
            if (fieldRules !== false) {
                const field = object[fieldName]
                if (fieldRules.required) {
                    if (isUndefined(field) || (isEmpty(field) && !isDate(field))) {
                        fieldError.push("required")
                    }
                }
                if (!isUndefined(field)) {
                    if (fieldRules.values) {
                        // @ts-ignore
                        if (!fieldRules.values.includes(field)) {
                            fieldError.push("values")
                        }
                    }
                    if (fieldRules.minlength && isString(field)) {
                        if (field.length <= fieldRules.minlength) {
                            fieldError.push("minlength")
                        }
                    }
                    if (fieldRules.maxlength && isString(field)) {
                        if (field.length >= fieldRules.maxlength) {
                            fieldError.push("maxlength")
                        }
                    }
                    if (fieldRules.minimum && (isNumber(field) || isDate(field))) {
                        if (field <= fieldRules.minimum) {
                            fieldError.push("minimum")
                        }
                    }
                    if (fieldRules.maximum && (isNumber(field) || isDate(field))) {
                        if (field >= fieldRules.maximum) {
                            fieldError.push("maximum")
                        }
                    }
                    if (fieldRules.pattern && isString(field)) {
                        if (fieldRules.pattern.test(field)) {
                            fieldError.push("pattern")
                        }
                    }
                }
            }
            if (!isEmpty(fieldError)) {
                errors[fieldName] = fieldError
            }
        }
        return !isEmpty(errors) ? errors : undefined
    }
}

export default validator
