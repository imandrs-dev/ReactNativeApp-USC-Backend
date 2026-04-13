const login = async (req, res) => {
  const { username, password } = req.body;

  // 1. Buscar usuario en BD
  const user = await User.findOne({ username });
  if (!user) return res.status(401)
    .json({ message: 'Credenciales inválidas' });

  // 2. Comparar contraseña con bcrypt
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401)
    .json({ message: 'Credenciales inválidas' });

  // 3. Generar JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  res.json({ success: true, token });
};
