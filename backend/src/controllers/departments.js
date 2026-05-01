import departmentsModel from "../models/departments.js";
import employeeModel from "../models/employee.js";

const departmentsController = {
    create: async (req, res) => {
        try {
            const { departmentCode, departmentName } = req.body;
            if (!departmentCode || !departmentName) {
                return res.status(400).json({ message: 'Todos los campos son requeridos' });
            }
            //Verificar que el código de departamento no exista
            const existingDepartment = await departmentsModel.findOne({ departmentCode });
            if (existingDepartment) {
                return res.status(400).json({ message: 'El código de departamento ya existe' });
            }
            const newDepartment = new departmentsModel({
                departmentCode,
                departmentName
            });
            await newDepartment.save();
            res.status(201).json({
                message: 'Departamento creado exitosamente',
                data: newDepartment
            });
        } catch (error) {
            console.error('Error creando departamento:', error);
            res.status(500).json({ message: 'Error al crear el departamento' });
        }
    },
    readAll: async (req, res) => {
        try {
            const departments = await departmentsModel.find().sort({ departmentCode: 1 });
            res.status(200).json({ data: departments });
        } catch (error) {
            console.error('Error leyendo departamentos:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    read: async (req, res) => {
        try {
            const departmentCode = Number(req.params.departmentCode);
            const departmentFound = await departmentsModel.findOne({ departmentCode });
            if (!departmentFound) {
                return res.status(404).json({ message: 'Departamento no encontrado' });
            }
            res.status(200).json({ data: departmentFound });
        } catch (error) {
            console.error('Error leyendo departamento:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    update: async (req, res) => {
        try {
            const departmentCode = Number(req.params.departmentCode);
            const { departmentName } = req.body;
            if (!departmentName) {
                return res.status(400).json({ message: 'El nombre del departamento es requerido' });
            }
            const updatedDepartment = await departmentsModel.findOneAndUpdate(
                { departmentCode },
                { departmentName },
                { returnDocument: 'after', runValidators: true }
            );
            if (!updatedDepartment) {
                return res.status(404).json({ message: 'Departamento no encontrado' });
            }
            res.status(200).json({ data: updatedDepartment });
        } catch (error) {
            console.error('Error actualizando departamento:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    delete: async (req, res) => {
        try {
            const departmentCode = Number(req.params.departmentCode);
            const deletedDepartment = await departmentsModel.findOneAndDelete({ departmentCode });
            if (!deletedDepartment) {
                return res.status(404).json({ message: 'Departamento no encontrado' });
            }
            res.status(200).json({ message: 'Departamento eliminado exitosamente', data: deletedDepartment });
        } catch (error) {
            console.error('Error eliminando departamento:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    readDepartmentwithEmployees: async (req, res) => {
        try {
            const departmentCode = Number(req.params.departmentCode);
            const department = await departmentsModel.findOne({ departmentCode });
            if (!department) {
                return res.status(404).json({ message: 'Departamento no encontrado' });
            }
            const employees = await employeeModel.find({ departmentCode });
            res.status(200).json({
                data: {
                    department,
                    employees
                }
            });
        } catch (error) {
            console.error('Error leyendo departamento con empleados:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
};

export default departmentsController;