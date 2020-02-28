const { JWT_SECRET, JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_EXP } = process.env;

export const jwtConstants = {
  secret: JWT_SECRET,
  accessTokenExpiration: JWT_ACCESS_TOKEN_EXP,
  refreshTokenExpiration: JWT_REFRESH_TOKEN_EXP,
};

export const appRoles = {
  admin: 'admin',
  user: 'user',
};
