const asyncHandler = require("express-async-handler");
const db = require("../data/database");

const inputMenu = asyncHandler(async (req, res) => {
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
});

const getAllMenu = asyncHandler(async (req, res) => {
  const query = `
        select * from menu;
    `;

  const menus = await db.query(query);

  return res.status(200).json(menus[0]);
});

const getMenu = asyncHandler(async (req, res) => {
  const { idMenu } = req.params;

  const query = `
        select * from menu
        where id_menu = ?;
    `;

  const menu = await db.query(query, [idMenu]);

  return res.status(200).json(menu[0]);
});

const editMenu = asyncHandler(async (req, res) => {
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
});

const deleteMenu = asyncHandler(async (req, res) => {
  const { idMenu } = req.params;

  const query = `
        delete from menu
        where id_menu = ?
    `;

  db.query(query, [idMenu]);
  return res.status(201).json({ msg: "Menu was deleted succeccfully" });
});

const setPesananSelesai = asyncHandler(async (req, res) => {
  const { idPesanan } = req.params;

  const query = `
        update pesanan
        set status_pesanan = 'Selesai'
        where id_pesanan = ?
      `;

  await db.query(query, [idPesanan]);
  return res.status(201).json({ msg: "Pesanan telah diselesaikan" });
});

const inputMeja = asyncHandler(async (req, res) => {
  const { idMeja, nomorMeja, kapasitasMeja } = req.body;

  const query = `
        insert into meja values (?, ?, ?);
    `;

  await db.query(query, [idMeja, nomorMeja, kapasitasMeja]);

  return res.status(201).json({ msg: "Meja created" });
});

const getAllMeja = asyncHandler(async (req, res) => {
  const query = `select * from meja;`;

  const mejas = await db.query(query);

  return res.status(200).json(mejas[0]);
});

const editMeja = asyncHandler(async (req, res) => {
  const { idMeja } = req.params;
  const { nomorMeja, kapasitasMeja } = req.body;

  const query = `
        update meja
        set nomor_meja = ?,
        kapasitas_meja = ?
        where id_meja = ?
    `;

  await db.query(query, [nomorMeja, kapasitasMeja, idMeja]);

  const updatedMeja = await db.query(`select * from meja where id_meja = ?;`, [
    idMeja,
  ]);

  return res.status(201).json({ msg: "Meja is updated", ...updatedMeja[0] });
});

const deleteMeja = asyncHandler(async (req, res) => {
  const { idMeja } = req.params;

  const query = `
        delete from meja where id_meja = ?;
    `;

  await db.query(query, [idMeja]);

  return res.status(201).json({ msg: "Meja was deleted successfully" });
});

module.exports = {
  inputMenu,
  getAllMenu,
  getMenu,
  editMenu,
  deleteMenu,
  setPesananSelesai,
  inputMeja,
  getAllMeja,
  editMeja,
  deleteMeja
};
