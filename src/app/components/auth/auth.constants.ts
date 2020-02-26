const { JWT_SECRET } = process.env;

export const jwtConstants = {
  secret: JWT_SECRET,
};

export const roles = {
  admin: 'admin',
  user: 'user',
};
