import express from "express";
import multer from 'multer';
import path from "path";
import employeeController from "../controllers/employee.controller";



const router = express.Router();

router.get('/list', employeeController.renderList);
router.get('/add', employeeController.renderAdd);
router.post('/add', employeeController.addEmployee);
router.get('/delete/:id', employeeController.deleteEmployee);
router.get('/update/:id', employeeController.renderUpdate);
router.post('/update/:id', employeeController.updateEmployee);
router.get('/list/sort', employeeController.sortEmployee);
router.get('/detail/:id', employeeController.details)

export default router;