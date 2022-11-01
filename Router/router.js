const express = require('express')
const router = express.Router()
const a = require('../models/list')

// Getting all
router.get('/', async (req, res) => {
  try {
    const person = await a.find()
    res.json(person)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})//ok

// Getting One By ID
router.get('/:id', getperson, (req, res) => {
  res.json(res.person)
})
// Creating one
router.post('/new', async (req, res) => {
  const student = new a({
    name: req.body.name,
    DoB: req.body.DoB,
    diemtb: req.body.diemtb
  })
  try {
    const newStudent = await student.save()
    res.status(201).json(newStudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getperson, async (req, res) => {
  if (req.body.name != null) {
    res.person.name = req.body.name
  }
  if (req.body.DoB != null) {
    res.person.DoB = req.body.DoB
  }
  if (req.body.diemtb != null) {
    res.person.diemtb = req.body.diemtb
  }
  try {
    const updatedStudent = await res.person.save()
    res.json(updatedStudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Deleting One
router.delete('/delete/:id', getperson, async (req, res) => {//z
  try {
    await res.person.remove()
    res.json({ message: 'Deleted person' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getperson(req, res, next) {
  let person
  try {
    person = await a.findById(req.params.id)
    if (person == null) {
      return res.status(404).json({ message: 'Cannot find person' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.person = person
  next()
}

module.exports = router