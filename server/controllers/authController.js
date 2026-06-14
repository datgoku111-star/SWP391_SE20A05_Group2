// server/controllers/authController.js
import authDao from '../dao/authDao.js';

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // 1. Kiểm tra xem người dùng có nhập đủ không
            if (!username || !password) {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu!' });
            }

            // 2. Tìm tài khoản trong Database thông qua tầng DAO
            const account = await authDao.findAccountByUsername(username);

            // 3. Kiểm tra tài khoản và mật khẩu (So sánh chuỗi thô trực tiếp)
            if (!account || account.password !== password) {
                return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không chính xác!' });
            }

            // 4. Đăng nhập thành công -> Trả về thông tin quyền hạn (role)
            return res.status(200).json({
                message: 'Đăng nhập thành công!',
                account: {
                    id: account.account_id,
                    username: account.username,
                    role: account.role
                }
            });

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

export default new AuthController();