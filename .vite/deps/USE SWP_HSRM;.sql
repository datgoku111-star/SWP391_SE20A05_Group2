USE SWP_HSRM;

-- 1. Bảng Tài khoản (Account)
CREATE TABLE Account (
    account_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'Employee'
);

-- 2. Bảng Nhân viên (Employee)
CREATE TABLE Employee (
    employee_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    gender NVARCHAR(10),
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    position NVARCHAR(50),
    account_id INT UNIQUE,
    FOREIGN KEY (account_id) REFERENCES Account(account_id) ON DELETE SET NULL
);

-- 3. Bảng Khách hàng (Customer)
CREATE TABLE Customer (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    identity_card VARCHAR(20) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    gender NVARCHAR(10)
);

-- 4. Bảng Loại phòng (RoomType)
CREATE TABLE RoomType (
    room_type_id INT IDENTITY(1,1) PRIMARY KEY,
    type_name NVARCHAR(50) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL
);

-- 5. Bảng Phòng (Room)
CREATE TABLE Room (
    room_id INT IDENTITY(1,1) PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    status NVARCHAR(20) NOT NULL DEFAULT 'Available',
    room_type_id INT,
    FOREIGN KEY (room_type_id) REFERENCES RoomType(room_type_id) ON DELETE SET NULL
);

-- 6. Bảng Đặt phòng trước (Booking)
CREATE TABLE Booking (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT,
    room_id INT,
    booking_date DATETIME DEFAULT GETDATE(),
    expected_check_in DATETIME NOT NULL,
    expected_check_out DATETIME NOT NULL,
    status NVARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Room(room_id) ON DELETE CASCADE
);

-- 7. Bảng Lượt ở thực tế (Stay)
CREATE TABLE Stay (
    stay_id INT IDENTITY(1,1) PRIMARY KEY,
    booking_id INT NULL, 
    customer_id INT NOT NULL,
    room_id INT NOT NULL,
    actual_check_in DATETIME NOT NULL,
    actual_check_out DATETIME NULL, 
    status NVARCHAR(20) DEFAULT 'Active',
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id) ON DELETE SET NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (room_id) REFERENCES Room(room_id)
);

-- 8. Bảng Dịch vụ (Service)
CREATE TABLE Service (
    service_id INT IDENTITY(1,1) PRIMARY KEY,
    service_name NVARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- 9. Bảng Sử dụng dịch vụ (ServiceUsage)
CREATE TABLE ServiceUsage (
    usage_id INT IDENTITY(1,1) PRIMARY KEY,
    stay_id INT NOT NULL,
    service_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    order_time DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (stay_id) REFERENCES Stay(stay_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES Service(service_id)
);

-- 10. Bảng Hóa đơn (Invoice)
CREATE TABLE Invoice (
    invoice_id INT IDENTITY(1,1) PRIMARY KEY,
    stay_id INT NOT NULL UNIQUE,
    employee_id INT, 
    room_charge DECIMAL(10, 2) NOT NULL DEFAULT 0.00, 
    service_charge DECIMAL(10, 2) NOT NULL DEFAULT 0.00, 
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00, 
    payment_time DATETIME DEFAULT GETDATE(),
    payment_method NVARCHAR(30) DEFAULT 'Cash',
    FOREIGN KEY (stay_id) REFERENCES Stay(stay_id),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) ON DELETE SET NULL
);

-- 11. Chèn luôn dữ liệu mẫu vào swp_hsrm
INSERT INTO Account (username, password, role) VALUES 
('admin1', 'admin123', 'Admin'), ('manager1', 'manager123', 'Manager'),
('reception1', 'staff123', 'Employee'), ('reception2', 'staff456', 'Employee');

INSERT INTO Employee (full_name, gender, phone, email, position, account_id) VALUES 
(N'Nguyễn Văn Thành', N'Nam', '0912345678', 'thanhnv@hotel.com', N'Quản lý', 2),
(N'Trần Thị Hồng', N'Nữ', '0987654321', 'hongtt@hotel.com', N'Lễ tân', 3),
(N'Lê Hoàng Nam', N'Nam', '0905111222', 'namlh@hotel.com', N'Lễ tân', 4);

INSERT INTO Customer (full_name, identity_card, phone, email, gender) VALUES 
(N'Phạm Minh Quân', '012345678901', '0933444555', 'quanpm@gmail.com', N'Nam'),
(N'Hoàng Ngọc Anh', '023456789012', '0944555666', 'anhhn@gmail.com', N'Nữ'),
(N'Vũ Đức Đạt', '034567890123', '0955666777', 'datvd@gmail.com', N'Nam');

INSERT INTO RoomType (type_name, price_per_night, capacity) VALUES 
(N'Phòng Đơn chuẩn (Single)', 300000.00, 1), (N'Phòng Đôi chuẩn (Double)', 500000.00, 2),
(N'Phòng Gia đình (Family)', 900000.00, 4), (N'Phòng VIP (Suite)', 1500000.00, 2);

INSERT INTO Room (room_number, status, room_type_id) VALUES 
('101', N'Available', 1), ('102', N'Available', 1), ('201', N'Available', 2),
('202', N'Available', 2), ('301', N'Available', 3), ('401', N'Available', 4);

INSERT INTO Service (service_name, price) VALUES 
(N'Nước suối', 15000.00), (N'Giặt là (bộ)', 30000.00),
(N'Mì ly', 20000.00), (N'Thuê xe máy (ngày)', 150000.00);