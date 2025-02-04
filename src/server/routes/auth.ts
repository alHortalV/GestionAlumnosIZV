import express, { Request, Response } from 'express';
import AuthService from '../service/authService';

const router = express.Router();
const authService = new AuthService();

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await authService.register(username, password);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await authService.login(username, password);
    res.status(200).json({ message: 'Login exitoso', user });
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
  }
});

export default router;