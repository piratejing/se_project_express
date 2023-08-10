const UNAUTHORIZED_ERROR = {
  status: "Unauthorized",
  error: 401,
};

const FORBIDDEN_ERROR = {
  status: "Forbidden",
  error: 403,
};

const NOTFOUND_ERROR = {
  status: "NotFound",
  error: 404,
};

const CONFLICT_ERROR = {
  status: "Conflict",
  error: 409,
};

const DEFAULT_ERROR = {
  status: "InternalServerError",
  error: 500,
};

module.exports = {
  NOTFOUND_ERROR,
  DEFAULT_ERROR,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR,
  UNAUTHORIZED_ERROR,
};
