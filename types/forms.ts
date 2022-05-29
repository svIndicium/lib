export type TouchedState<T> = {
  -readonly [key in keyof T]: Boolean
}
