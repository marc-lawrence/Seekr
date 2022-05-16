const express = require('express')
const router = express.Router()
const { getApp, setApp, getSingleApp, updateApp, deleteApp } = require('../controllers/appController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getApp)

router.post('/', protect, setApp)

router.get('/:id', protect, getSingleApp)

router.put('/:id', protect, updateApp)

router.delete('/:id', protect, deleteApp)

module.exports = router