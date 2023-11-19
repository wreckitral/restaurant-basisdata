const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  inputMenu,
  getAllMenu,
  getMenu,
  editMenu,
  deleteMenu,
  setPesananSelesai,
  inputMeja,
  getAllMeja,
  editMeja,
  deleteMeja,
} = require("../controllers/admin-controller");

router.post("/input-menu", inputMenu);

router.get("/all-menu", getAllMenu);

router.get("/:idMenu/menu", getMenu);

router.patch("/:idMenu/edit-menu", editMenu);

router.post("/:idMenu/delete-menu", deleteMenu);

router.patch("/:idPesanan/set-pesanan-selesai", setPesananSelesai);

router.post("/input-meja", inputMeja);

router.get("/all-meja", getAllMeja);

router.patch("/:idMeja/edit-meja", editMeja);

router.post("/:idMeja/delete-meja", deleteMeja);

module.exports = router;
