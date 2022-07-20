import {Schema, model} from "mongoose";


interface IEmployee {
    name: string;
    code: string;
    age: string;
    salary: string;
    branch: object;
}

const employeeSchema = new Schema<IEmployee>({
    name: String,
    code: String,
    age: String,
    salary: String,
    branch: {type: Schema.Types.ObjectId, ref: "branch"},

})

const EmployeeModel = model<IEmployee>('employee', employeeSchema);

export {EmployeeModel};