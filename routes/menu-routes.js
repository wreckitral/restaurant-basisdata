const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const db = require("../data/database");

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const query = `select * from menu;`;
    const [menus] = await db.query(query);
    return res.status(200).json(menus);
  })
);

router.get(
  "/:menuId",
  asyncHandler(async (req, res) => {
    const { menuId } = req.params;
    const query = `
        select * from menu
        where id_menu = ?
    `;

    const menu = await db.query(query, [menuId]);
    return res.status(200).json(...menu[0]);
  })
);

module.exports = router;
