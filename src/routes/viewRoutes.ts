import express, { Request, Response } from 'express';
export const viewRoutes = express.Router();
const user = {
    id: 1,
    name: 'Megha',
    email: 'megha@example.com',
  };

viewRoutes.get('/', (req: Request, res: Response) => {
  res.render('index',{user:user});
});

viewRoutes.get('/bookings', (req: Request, res: Response) => {
    res.render('bookings',{user:user});
});
  