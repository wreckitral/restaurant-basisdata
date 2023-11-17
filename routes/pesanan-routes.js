const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const db = require("../data/database");

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const query = `
    SELECT 
        pesanan.id_pesanan, 
        pesanan.id_pelanggan,
        pelanggan.nama_pelanggan,
        pesanan.id_karyawan, 
        karyawan.nama_karyawan, 
        pesanan.tangal_pesanan, 
        pesanan.status_pesanan, 
        pesanan.total_harga_pesanan
    FROM pesanan
    INNER JOIN pelanggan ON pesanan.id_pelanggan = pelanggan.id_pelanggan
    INNER JOIN karyawan ON pesanan.id_karyawan = karyawan.id_karyawan;
    `;

    const [pesanan] = await db.query(query);
    return res.status(200).json(pesanan);
  })
);

router.get(
  "/:pesananId",
  asyncHandler(async (req, res) => {
    const { pesananId } = req.params;
    const query = `
    select * from pesanan
    where id_pesanan = ?;
    `;

    const pesanan = await db.query(query, [pesananId]);
    return res.status(200).json(...pesanan[0]);
  })
);

module.exports = router;
