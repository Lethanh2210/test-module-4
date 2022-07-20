import {EmployeeModel} from "../models/employee.model";
import {BranchModel} from "../models/branch.model"
import {NextFunction} from "express";

const employeeController = {
    renderList: async (req, res, next) => {
        let employees = await EmployeeModel.find().populate({
            path: "branch", select: "name"
        })
        res.render('list', {employees: employees});
    },

    addEmployee: async (req, res, next) => {
        try {
            let employee = new EmployeeModel({
                name: req.body.name,
                code: req.body.code,
                age: req.body.age,
                salary: req.body.salary,
                branch: req.body ? req.body.branch : "none",
            })
            console.log(employee)
            await employee.save()
            res.redirect('/employee/list')
        }catch (err) {
            console.error(err);
        }
    },

    renderAdd: async (req, res , next) =>{
        try {
            let branches = await BranchModel.find();
            res.render("create", {branches: branches})
        }catch (err) {
            console.error(err);
        }
    },

    deleteEmployee: async (req, res, next) => {
        await EmployeeModel.findOneAndRemove({_id: req.params.id}).lean();
        res.redirect('/employee/list');
    },

    updateEmployee: async (req, res, next) => {
        try {
            const employee = await EmployeeModel.findOne({_id: req.params.id}).populate({path: "branch", select: "name"});
            console.log(employee);
            employee.name = req.body.name;
            employee.code = req.body.code;
            employee.age = req.body.age;
            employee.salary = req.body.salary;
            employee.branch = req.body.branch;
            await employee.save()
            res.redirect('/employee/list')
        } catch (e) {
            console.log(e.message);
        }
    },

    renderUpdate: async (req, res, next) => {
        let employee = await EmployeeModel.findOne({_id: req.params.id})
        let branches = await BranchModel.find();
        res.render('update', {employee: employee, branches: branches});
    },

    sortEmployee: async (req, res, next) => {
        let employees = await EmployeeModel.find().sort({age: 1}).populate({
            path: "branch", select: "name"
        })
        res.render('list', {employees: employees})
    },

    details: async (req, res, next) => {
        let employee = await EmployeeModel.findOne({_id: req.params.id}).populate({
            path: "branch", select: "name"
        })
        res.render('detail', {employee: employee});
    },

    renderHome: async (req, res, next) => {
        res.render('/');
    }
}

export default employeeController;