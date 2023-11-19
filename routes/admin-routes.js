const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const db = require("../data/database");

router.post(
  "/input-menu",
  asyncHandler(async (req, res) => {
    const { idMenu, namaMenu, kategori, harga, linkFoto, deskripsi } = req.body;

    const query = `
        insert into menu values (?, ?, ?, ?, ?, ?);
    `;

    await db.query(query, [
      idMenu,
      namaMenu,
      kategori,
      harga,
      linkFoto,
      deskripsi,
    ]);

    return res.status(201).json({ msg: "Successfully created a menu" });
  })
);

router.get(
  "/all-menu",
  asyncHandler(async (req, res) => {
    const query = `
        select * from menu;
    `;
    const menus = await db.query(query);

    return res.status(200).json(menus[0]);
  })
);

router.patch(
  "/:idMenu/edit",
  asyncHandler(async (req, res) => {
    const { idMenu } = req.params;
    const { namaMenu, kategori, harga, linkFoto, deskripsi } = req.body;

    const query = `
        update menu
        set nama_menu = ?,
        kategori = ?,
        harga = ?,
        linkFoto = ?,
        deskripsi = ?
        WHERE id_menu = ?;
    `;

    await db.query(query, [
      namaMenu,
      kategori,
      harga,
      linkFoto,
      deskripsi,
      idMenu,
    ]);

    const updatedMenu = await db.query(`select * from menu where id_menu = ?`, [
      idMenu,
    ]);

    return res
      .status(201)
      .json({ msg: "Menu was updated successfully", ...updatedMenu[0] });
  })
);

router.post(
  "/:idMenu/delete",
  asyncHandler(async (req, res) => {
    const { idMenu } = req.params;

    const query = `
        delete from menu
        where id_menu = ?
    `;

    db.query(query, [idMenu]);
    return res.status(201).json({ msg: "Menu was deleted succeccfully" });
  })
);

router.patch(
  "/:idPesanan/set-pesanan-selesai",
  asyncHandler(async (req, res) => {
    const { idPesanan } = req.params;

    const query = `
        update pesanan
        set status_pesanan = 'Selesai'
        where id_pesanan = ?
      `;

    await db.query(query, [idPesanan]);
    return res.status(201).json({ msg: "Pesanan telah diselesaikan" });
  })
);


module.exports = router;
