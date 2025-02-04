import User, { IUser } from '../models/User';

class AuthService {
  async register(username: string, password: string): Promise<IUser> {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const newUser = new User({ username, password });
    await newUser.save();
    return newUser;
  }

  async login(username: string, password: string): Promise<IUser> {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.password !== password) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }
}

export default AuthService;