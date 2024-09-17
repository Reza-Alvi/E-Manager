const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const AuthRouter = require('./Routes/AuthRouter');
const employeeRoutes = require('./Routes/employees');

require('dotenv').config();
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://e-manager-ui.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', AuthRouter);
app.use('/api/employees', employeeRoutes);

app.post('/auth/refresh-token', AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
