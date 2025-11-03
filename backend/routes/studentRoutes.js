const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { protect, adminOnly: admin } = require('../middleware/authMiddleware');

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    // Force refresh from database with no filters
    const students = await Student.find({}).sort({ createdAt: -1 });
    console.log(`Found ${students.length} students in database`);
    
    // Always return what we have, even if empty
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Register a new student
// @route   POST /api/students
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, age, dob, email, phone, address, enrollingCourse } = req.body;

    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    const student = await Student.create({
      name,
      age,
      dob,
      email,
      phone,
      address,
      enrollingCourse
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        message: 'Student registered successfully'
      });
    } else {
      res.status(400).json({ message: 'Invalid student data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (student) {
      student.name = req.body.name || student.name;
      student.age = req.body.age || student.age;
      student.dob = req.body.dob || student.dob;
      student.email = req.body.email || student.email;
      student.phone = req.body.phone || student.phone;
      student.address = req.body.address || student.address;
      student.enrollingCourse = req.body.enrollingCourse || student.enrollingCourse;

      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (student) {
      await student.deleteOne();
      res.json({ message: 'Student removed' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;