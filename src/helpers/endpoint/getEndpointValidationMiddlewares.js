/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import BadRequestError from "errors/BadRequestError";

import { checkSchema, validationResult } from "express-validator";

async function handleValidationResultMiddleware(req, res, next) {
  const result = validationResult(req);
  const { errors } = result;

  if (errors.length) {
    console.log(errors);
    const firstErrorMessage = errors[0].msg;
    next(new BadRequestError(firstErrorMessage));
  }

  next();
}

export default function getEndpointValidationMiddlewares(endpoint) {
  const checkMiddlewares = checkSchema(endpoint.validation);
  return [...checkMiddlewares, handleValidationResultMiddleware];
}
