// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // <-- THÊM DÒNG NÀY

dotenv.config(); 
const app = express();

app.use(cors()); 
app.use(express.json()); 

connectDB();

// Đăng ký cổng API cho chức năng Auth
app.use('/api/auth', authRoutes); // <-- THÊM DÒNG NÀY (Tất cả các link trong authRoutes sẽ có tiền tố /api/auth)

app.get('/', (req, res) => {
    res.send('🚀 Server Quản lý khách sạn SWP_HSRM đang hoạt động!');
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` Server đang chạy tại cổng: ${PORT}`);
    console.log(`==================================================`);
});