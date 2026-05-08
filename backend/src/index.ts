import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { requireAuth } from './middleware/auth.middleware';
import flowRoutes from './routes/flow.routes';
import authRoutes from './routes/auth.routes';
import factoryRoutes from './routes/factory/factory.routes';
import leadRoutes from './routes/lead.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutes
app.use('/api/auth', authRoutes);
app.use('/api/flows', flowRoutes);
app.use('/api/factory', factoryRoutes);
app.use('/api/leads', leadRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Portal AMG Backend is running', data: null });
});

// Ruta de prova protegida
app.get('/api/protected', requireAuth, (req: Request, res: Response) => {
  res.json({ success: true, message: 'Has accedit a una ruta protegida', data: (req as any).user });
});

app.listen(port, () => {
  console.log(`[SERVER] Running on http://localhost:${port}`);
});
