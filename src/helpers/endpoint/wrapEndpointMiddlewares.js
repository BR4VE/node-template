import Request from "helpers/Request";

export default function wrapEndpointMiddlewares(middlewares) {
  return middlewares.map((middleware) => async (req, res, next) => {
    const request = new Request(req, res);
    try {
      await Promise.resolve(middleware(request, next));
    } catch (err) {
      next(err);
    }
  });
}
