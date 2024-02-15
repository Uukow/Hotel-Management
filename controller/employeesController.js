// // employeesController.js
// const Employee = require('../models/Employee');

// async function registerEmployees(req, res) {
//     try {
//         const { name, position, phone, email, location } = req.body;

//         const newEmployee = new Employee({
//             name,
//             position,
//             phone,
//             email,
//             location,
//         });

//         await newEmployee.save();

//         res.json({ status: true, data: 'Registration successful' });
//     } catch (error) {
//         res.json({ status: false, data: error.message });
//     }
// }

// async function getEmployees(req, res) {
//     try {
//         const employees = await Employee.find();
//         res.json({ status: true, data: employees });
//     } catch (error) {
//         res.json({ status: false, data: error.message });
//     }
// }

// async function getEmployeeInfo(req, res) {
//     try {
//         const { id } = req.body;
//         const employee = await Employee.findById(id);

//         if (!employee) {
//             res.json({ status: false, data: 'Employee not found' });
//         } else {
//             res.json({ status: true, data: employee });
//         }
//     } catch (error) {
//         res.json({ status: false, data: error.message });
//     }
// }

// async function updateEmployee(req, res) {
//     try {
//         const { id, name, position, phone, email, location } = req.body;

//         const updatedEmployee = await Employee.findByIdAndUpdate(
//             id,
//             {
//                 name,
//                 position,
//                 phone,
//                 email,
//                 location,
//             },
//             { new: true }
//         );

//         if (!updatedEmployee) {
//             res.json({ status: false, data: 'Employee not found' });
//         } else {
//             res.json({ status: true, data: 'Updated successfully' });
//         }
//     } catch (error) {
//         res.json({ status: false, data: error.message });
//     }
// }

// async function deleteEmployee(req, res) {
//     try {
//         const { id } = req.body;
//         const deletedEmployee = await Employee.findByIdAndDelete(id);

//         if (!deletedEmployee) {
//             res.json({ status: false, data: 'Employee not found' });
//         } else {
//             res.json({ status: true, data: 'Deleted successfully' });
//         }
//     } catch (error) {
//         res.json({ status: false, data: error.message });
//     }
// }

// module.exports = {
//     registerEmployees,
//     getEmployees,
//     getEmployeeInfo,
//     updateEmployee,
//     deleteEmployee,
// };
