const MAIN_FRAME = 'main_frame';

class Request {
  constructor(request) {
    this.request = request;

    this.url = new URL(request.url);
    this.searchParams = this.url.searchParams;
  }

  fromMainFrame() {
    return this.request.type === MAIN_FRAME;
  }

  matches(regex, params) {
    return this.url.href.match(new RegExp(regex)) &&
           this.fromMainFrame() &&
           this.requiresModification(params);
  }

  addQueryParameters(params) {
    const newUrl = new URL(this.url.href);

    params.forEach((param) => {
      if (!newUrl.searchParams.has(param.key)) {
        newUrl.searchParams.set(param.key, param.value);
      }
    });

    return newUrl;
  }

  requiresModification(params) {
    return params.reduce((match, param) => match || !this.searchParams.has(param.key), false);
  }
}
