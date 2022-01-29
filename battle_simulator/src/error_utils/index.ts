export function assertDefined<T>(
  val: T | undefined,
  msg?: string
): asserts val is T {
  if (val === undefined) {
    throw Error(msg ?? "Value is not defined");
  }
}

export function assert(flag: boolean, msg?: string) {
  if (!flag) {
    throw Error(msg ?? "Assertion failure");
  }
}
