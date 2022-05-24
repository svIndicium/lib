export enum RuleType {
    REQUIRED = "required",
    VALUES = "values",
    MINLENGTH = "minlength",
    MAXLENGTH = "maxlength",
    PATTERN = "pattern",
    MINIMUM = "minimum",
    MAXIMUM = "maximum"
}

export type ObjectRules<T> = {
    [F in keyof T]-?: FieldRules<F, T> | false
}

export interface FieldRules<F extends keyof T, T> {
    readonly [RuleType.REQUIRED]: boolean | ((this: Partial<T>) => boolean)

    readonly [RuleType.VALUES]?: Array<NonNullable<T[F]>>

    readonly [RuleType.MINLENGTH]?: T[F] extends string | undefined ? number : never
    readonly [RuleType.MAXLENGTH]?: T[F] extends string | undefined ? number : never
    readonly [RuleType.PATTERN]?: T[F] extends string | undefined ? RegExp : never

    readonly [RuleType.MINIMUM]?: T[F] extends number | Date | undefined ? T[F] : never
    readonly [RuleType.MAXIMUM]?: T[F] extends number | Date | undefined ? T[F] : never
}

export type ObjectErrors<T> = {
    [F in keyof T]?: FieldErrors
}

export type FieldErrors<T = unknown> = Array<string> | undefined

export type ObjectValidator<T> = (object: T) => Promise<ObjectErrors<T> | undefined>
