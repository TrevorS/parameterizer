class Pattern {
  constructor(name, regex, queryParameters) {
    this.name = name;
    this.regex = regex;

    if (!queryParameters) {
      this.queryParameters = [];
    } else {
      this.queryParameters = queryParameters;
    }
  }
}
