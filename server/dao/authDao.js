// server/dao/authDao.js
import { sql } from '../config/db.js';

class AuthDao {
    async findAccountByUsername(username) {
        try {
            // Dùng câu lệnh có tham số (@username) để chống lỗi bảo mật SQL Injection
            const result = await sql.query`
                SELECT * FROM Account 
                WHERE username = ${username}
            `;
            return result.recordset[0]; // Trả về tài khoản đầu tiên tìm thấy (hoặc undefined)
        } catch (err) {
            throw new Error('Lỗi truy vấn Database: ' + err.message);
        }
    }
}

export default new AuthDao();