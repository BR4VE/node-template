/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
export default function getEndpointCredentialCheck(endpoint) {
  return async (request, next) => {
    if (!endpoint.credentialChecks) {
      return next();
    }

    for (const checkFunction of endpoint.credentialChecks) {
      await checkFunction(request);
    }

    next();
  };
}
