const db = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ActivityLog = require("../models/ActivityLog"); 

// register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Cek apakah email sudah terdaftar
    const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    // 2. Hash password pengguna
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Masukkan pengguna baru ke database MySQL
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // 4. Simpan log aktivitas pendaftaran ke MongoDB
     await ActivityLog.create({
      userId: result.insertId,
      action: "REGISTER",
      description: `${name} berhasil melakukan register`,
    });

    return res.status(201).json({
      message: "Register sukses",
    });

  } catch (error) {
    console.error("Error pada saat register:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cari user berdasarkan email
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(404).json({
        message: "Data user tidak ditemukan",
      });
    }

    const user = users[0];

    // 2. Cek status blokir akun
    if (user.status === 'blocked') {
      return res.status(403).json({ 
        message: "Akun Anda telah dinonaktifkan/diblokir oleh admin. Silakan hubungi pihak perpustakaan." 
      });
    }

    // 3. Bandingkan password hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password Salah",
      });
    }

    // 4. Buat JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // 5. Simpan log aktivitas login ke MongoDB
    await ActivityLog.create({
      userId: user.id,
      action: "LOGIN",
      description: `${user.name} telah login`,
    }); 

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Error pada saat login:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// logout
exports.logout = async (req, res) => {
  try {
    const { userId } = req.body;

    // Simpan log aktivitas logout ke MongoDB
     await ActivityLog.create({
      userId,
      action: "LOGOUT",
      description: "User telah logout",
    });

    return res.json({
      message: "Logout berhasil",
    });
  } catch (error) {
    console.error("Error pada saat logout:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};