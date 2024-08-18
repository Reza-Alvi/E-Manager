const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employee = require('../Models/employee');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const employees = await Employee.find({ userId: req.user._id });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/search', ensureAuthenticated, async (req, res) => {
  const { name, email, gender, age, category, salary } = req.query;
  let query = { userId: req.user._id };

  if (name) query.name = new RegExp(name, 'i');
  if (email) query.contacts = new RegExp(email, 'i');
  if (gender) query.gender = gender;
  if (age) query.age = age;
  if (category) query.category = new RegExp(category, 'i');
  if (salary) query.salary = salary;

  try {
    const employees = await Employee.find(query);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', ensureAuthenticated, upload.single('photo'), async (req, res) => {
  const { name, age, gender, nationality, address, contacts, category, salary } = req.body;
  const userId = req.user._id;

  let photo = '';
  if (req.file) {
    photo = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  const employee = new Employee({ name, age, gender, nationality, address, contacts, category, salary, photo, userId });
  await employee.save();
  res.send(employee);
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id, userId: req.user._id });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', ensureAuthenticated, upload.single('photo'), async (req, res) => {
  const { name, age, gender, nationality, address, contacts, category, salary } = req.body;
  const userId = req.user._id;

  let photo = req.body.photo;
  if (req.file) {
    photo = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  const employee = await Employee.findOneAndUpdate(
    { _id: req.params.id, userId },
    { name, age, gender, nationality, address, contacts, category, salary, photo },
    { new: true }
  );
  if (!employee) return res.status(404).json({ error: 'Employee not found' });
  res.send(employee);
});

router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
