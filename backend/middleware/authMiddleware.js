const jwt = require('jsonwebtoken');
const db = require("../config/mysql"); 

const verifyMember = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan!" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if (verified.role !== 'member' && verified.role !== 'admin') {
      return res.status(403).json({ message: "Akses ditolak, peran tidak dikenali!" });
    }

    // 📦 Menggunakan await untuk query ke MySQL Pool
    const [results] = await db.query("SELECT status FROM users WHERE id = ?", [verified.id]);
      
    if (results.length === 0) {
      return res.status(404).json({ message: "Akun tidak ditemukan di sistem." });
    }

    if (results[0].status === 'blocked') {
      return res.status(403).json({ message: "Akses ditolak. Akun Anda telah diblokir oleh pihak perpustakaan!" });
    }

    req.user = verified; 
    next(); 

  } catch (err) {
    return res.status(400).json({ message: "Token tidak valid atau kadaluwarsa!" });
  }
};

const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan!" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if (verified.role !== 'admin') {
      return res.status(403).json({ message: "Akses ditolak, area khusus Admin!" });
    }

    // 📦 Menggunakan await untuk query ke MySQL Pool
    const [results] = await db.query("SELECT status FROM users WHERE id = ?", [verified.id]);
      
    if (results.length === 0 || results[0].status === 'blocked') {
      return res.status(403).json({ message: "Akses ditolak. Sesi admin tidak aktif!" });
    }

    req.user = verified; 
    next(); 

  } catch (err) {
    return res.status(400).json({ message: "Token tidak valid atau kadaluwarsa!" });
  }
};

module.exports = { verifyMember, verifyAdmin };