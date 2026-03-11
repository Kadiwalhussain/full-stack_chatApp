const localOriginPatterns = [
  /^http:\/\/localhost(?::\d+)?$/,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/,
];

function getConfiguredOrigins() {
  return (process.env.CLIENT_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  return (
    getConfiguredOrigins().includes(origin) ||
    localOriginPatterns.some((pattern) => pattern.test(origin))
  );
}

export function corsOriginDelegate(origin, callback) {
  if (isAllowedOrigin(origin)) {
    return callback(null, true);
  }

  return callback(new Error(`Origin ${origin} is not allowed by CORS`));
}