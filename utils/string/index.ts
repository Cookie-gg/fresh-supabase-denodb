const createParser = (matcher: RegExp, replacer: (match: string) => string) => {
  const regex = RegExp(matcher, "g");
  return (string: string) => {
    if (typeof string !== "string") {
      throw new TypeError(
        `expected an argument of type string, but got ${typeof string}`
      );
    }

    if (!string.match(regex)) {
      return string;
    }

    return string.replace(regex, replacer);
  };
};

export const camelToKebab = createParser(
  /[A-Z]/,
  (match) => `-${match.toLowerCase()}`
);
