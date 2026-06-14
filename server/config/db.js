// server/config/db.js
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    user: 'dat1120',          
    password: '123',
    server: 'localhost',
    database: 'swp_hsrm',
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        const pool = await sql.connect(config);
        console.log(' Đã kết nối thành công tới SQL Server (swp_hsrm)!');
        return pool;
    } catch (err) {
        console.error(' Lỗi kết nối SQL Server:', err.message);
        process.exit(1);
    }
};

// ĐÂY LÀ DÒNG QUYẾT ĐỊNH: Phải export dạng này thì index.js mới nhận được
export { sql, connectDB };