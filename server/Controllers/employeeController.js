const Employee = require('../Models/employee');

const searchEmployees = async (req, res) => {
    try {
        const { searchBy, gender, age, category, salary } = req.query;
        let query = {};

        if (searchBy && searchBy === 'name') {
            query.name = new RegExp(req.query.name, 'i');
        } else if (searchBy && searchBy === 'email') {
            query.contacts = new RegExp(req.query.email, 'i');
        }

        if (gender && gender !== 'all') {
            query.gender = gender;
        }

        if (age) {
            query.age = age;
        }

        if (category) {
            query.category = new RegExp(category, 'i');
        }

        if (salary) {
            query.salary = salary;
        }

        const employees = await Employee.find(query);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    searchEmployees,
};
