const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) return response.status(401).send({ error: 'No autorizado' });

  const parts = authHeader.split(' ');

  if (parts.length !== 2)
    return response.status(401).send({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: 'Token mal formateado' });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    request.userId = uid.id;
    request.userName = uid.name;
    request.userRoleId = uid.roleId;

  } catch (error) {
    return response.status(401).json({
      error: 'Token no válido',
    });
  }

  return next();
};
