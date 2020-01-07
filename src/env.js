export const ENVIRONMENTS = {
  DEV: 'development',
};

export const ENVIRONMENT = getEnvironment();
export const IS_DEVELOPMENT = ENVIRONMENT === ENVIRONMENTS.DEV;

function getEnvironment() {
  return ENVIRONMENTS.DEV;
}