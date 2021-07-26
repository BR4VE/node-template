export default function httpsRedirect() {
  return (request, response, next) => {
    if (
      request.hostname === "localhost" ||
      request.secure ||
      request.headers["x-forwarded-proto"] === "https"
    ) {
      return next();
    }

    return response.redirect(`https://${request.headers.host}${request.url}`);
  };
}
