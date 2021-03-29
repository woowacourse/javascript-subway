const COOKIE_KEY = {
  JWT_TOKEN: 'jwtToken',
};

const REG_EXP = {
  EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  NAME: /\s+/,
  PASSWORD: /^(?=.*[a-zA-z])(?=.*[0-9]).{6,15}$/,
};

export { COOKIE_KEY, REG_EXP };
