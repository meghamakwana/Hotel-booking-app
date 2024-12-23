
import express, { Request, Response  } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { apiRoutes } from './routes/apiRoutes';
import { viewRoutes } from './routes/viewRoutes';
import expressLayouts from 'express-ejs-layouts';

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view cache', false); 

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the 'views' directory to where your EJS views are located
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts to handle layouts
app.use(expressLayouts);

// This tells express-ejs-layouts where to find the default layout
app.set('layout', 'layouts/layout');  // This points to views/layouts/layout.ejs

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '../public')));


app.use('/api', apiRoutes);
app.use('/', viewRoutes);
app.use((err: any, req: Request, res: Response, next: any) => {
  if (err) {
    res.status(500).json({ message: err.message });
  } else {
    next();
  }
});
export default app;
