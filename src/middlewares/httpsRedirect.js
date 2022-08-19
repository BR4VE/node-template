import Environment from "infra/Environment";

export default function httpsRedirect() {
  return (request, response, next) => {
    if (
      Environment.isDev() ||
      Environment.isTest() ||
      request.secure ||
      request.headers["x-forwarded-proto"] === "https"
    ) {
      return next();
    }

    return response.redirect(`https://${request.headers.host}${request.url}`);
  };
}
