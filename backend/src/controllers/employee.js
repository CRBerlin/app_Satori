import employeeModel from "../models/employee.js";

const employeeController = {
    create: async (req, res) => {
        try {
            const {
                employeeCode,
                firstName,
                lastName1,
                lastName2,
                departmentCode
            } = req.body;
            if (!employeeCode || !firstName || !lastName1 || !lastName2 || !departmentCode) {
                return res.status(400).json({ message: 'Todos los campos son requeridos' });
            }
            //Verificar que el código de empleado no exista
            const existingEmployee = await employeeModel.findOne({ employeeCode });
            if (existingEmployee) {
                return res.status(400).json({ message: 'El código de empleado ya existe' });
            }
            const newEmployee = new employeeModel({
                employeeCode,
                firstName,
                lastName1,
                lastName2,
                departmentCode
            });

            await newEmployee.save();
            res.status(201).json({
                message: 'Empleado creado exitosamente',
                data: newEmployee
            });
        } catch (error) {
            console.error('Error creando empleado:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    readAll: async (req, res) => {
        try {
            const employees = await employeeModel.find().sort({ employeeCode: 1 });
            res.status(200).json({ data: employees });
        } catch (error) {
            console.error('Error leyendo empleados:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    read: async (req, res) => {
        try {
            const employeeCode = Number(req.params.employeeCode);
            const employeeFound = await employeeModel.findOne({ employeeCode });
            if (!employeeFound) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            res.status(200).json({ data: employeeFound });
        } catch (error) {
            console.error('Error leyendo empleado:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    update: async (req, res) => {
        try {
            const employeeCode = Number(req.params.employeeCode);

            const {
                firstName,
                lastName1,
                lastName2,
                departmentCode
            } = req.body;

            const updateData = {};

            if (firstName) updateData.firstName = firstName;
            if (lastName1) updateData.lastName1 = lastName1;
            if (lastName2) updateData.lastName2 = lastName2;
            if (departmentCode) updateData.departmentCode = departmentCode;

            const updatedEmployee = await employeeModel.findOneAndUpdate(
                { employeeCode },
                updateData,
                { returnDocument: 'after', runValidators: true }
            );

            if (!updatedEmployee) {
                return res.status(404).json({
                    message: 'Empleado no encontrado'
                });
            }

            res.status(200).json({
                message: 'Empleado actualizado exitosamente',
                data: updatedEmployee
            });

        } catch (error) {
            console.error('Error actualizando empleado:', error);
            res.status(500).json({
                message: 'Error del servidor'
            });
        }
    },
    delete: async (req, res) => {
        try {
            const employeeCode = Number(req.params.employeeCode);
            const employeeToDelete = await employeeModel.findOne({
                employeeCode
            });
            if (!employeeToDelete) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            await employeeToDelete.deleteOne();
            res.status(200).json({ message: 'Empleado eliminado exitosamente' });
        } catch (error) {
            console.error('Error eliminando empleado:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
};

export default employeeController;