import authenticateUser from "helpers/endpoint/authenticateUser";
import getEndpointCredentialCheck from "helpers/endpoint/getEndpointCredentialCheck";
import getEndpointValidationMiddlewares from "helpers/endpoint/getEndpointValidationMiddlewares";
import wrapEndpointMiddlewares from "helpers/endpoint/wrapEndpointMiddlewares";

export default function getEndpointMiddlewares(endpoint) {
  const middlewares = [];

  if (endpoint.authentication) {
    middlewares.push(authenticateUser);
  }

  if (endpoint.validation) {
    middlewares.push(getEndpointValidationMiddlewares(endpoint));
  }

  // TODO: Handle upload

  // Do not wrap 3rd party packages with Request
  const middlewaresUsingRequest = [];

  if (endpoint.credentialChecks) {
    middlewaresUsingRequest.push(getEndpointCredentialCheck(endpoint));
  }

  const { controller } = endpoint;

  if (!controller.respond) {
    throw new Error(`Controller.respond is not provided for ${endpoint.path}`);
  }

  middlewaresUsingRequest.push(controller.respond.bind(controller));

  return [...middlewares, ...wrapEndpointMiddlewares(middlewaresUsingRequest)];
}
