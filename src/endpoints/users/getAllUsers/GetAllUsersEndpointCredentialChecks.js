import ErrorMessages from "helpers/utils/ErrorMessages";
import ForbiddenError from "errors/ForbiddenError";

function canUserSort(request) {
  const { sort } = request.getData();
  const user = request.getUser();

  if (!sort) {
    return;
  }

  if (!user.admin) {
    throw new ForbiddenError(ErrorMessages.notAuthorized("sort"));
  }
}

export default [canUserSort];
