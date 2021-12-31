const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/Auth");
const bill = require("../Models/Bill");
const BillsController = require("../Controllers/BillsController")

// xem danh sách hóa đơn
router.get("/", BillsController.GetBills )  

// thêm hóa đơn
router.post('/',  BillsController.AddBill)

//sửa hóa đơn theo id
router.put('/:id',  BillsController.UpdateBill)

// xóa bill
router.delete('/:id',  BillsController.DeleteBill )


module.exports = router