const asyncHandler = require('express-async-handler')
const App = require('../models/appModel')
const User = require('../models/userModel')


// @desc Get apps
// @route GET /api/apps
// @access Private
const getApp = asyncHandler(async (req, res) => {
  const apps = await App.find({ user: req.user.id })

  res.status(200).json(apps)
})


// @desc Set apps
// @route POST /api/apps
// @access Private
const setApp = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const app = await App.create({
    company: req.body.company,
    position: req.body.position,
    posting: req.body.posting,
    recruiter: req.body.recruiter,
    stage: req.body.stage,
    date: req.body.date,
    user: req.user.id
  })

  res.status(200).json(app)
})



// @desc Get single app
// @route GET /api/apps/:id
// @access Private
const getSingleApp = asyncHandler(async (req, res) => {
  const app = await App.findById(req.params.id)

  if (!app) {
    res.status(400)
    throw new Error('Application not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the login user matches the App user
  if (app.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  res.status(200).json(app)
})



// @desc Update apps
// @route PUT /api/apps/:id
// @access Private
const updateApp = asyncHandler(async (req, res) => {
  console.log(req)
  const app = await App.findById(req.params.id)
  // const body = { Company: req.body.Company, Position: req.body.Position, Posting: req.body.Posting, Recruiter: req.body.Recruiter, Date: req.body.Date, Stage: req.body.Stage }
  // console.log(body)
  console.log(req)
  if (!app) {
    res.status(400)
    throw new Error('Application not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the login user matches the App user
  if (app.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedApp = await App.findByIdAndUpdate(req.params.id, {
    company: req.body.Company,
    position: req.body.Position,
    posting: req.body.Posting,
    recruiter: req.body.Recruiter,
    date: req.body.Date,
    stage: req.body.Stage
  }, { new: true })
  res.status(200).json(updatedApp)
})



// @desc Delete apps
// @route DELETE /api/apps
// @access Private
const deleteApp = asyncHandler(async (req, res) => {
  const app = await App.findById(req.params.id)

  if (!app) {
    res.status(400)
    throw new Error('Application not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the login user matches the App user
  if (app.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await app.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getApp,
  setApp,
  getSingleApp,
  updateApp,
  deleteApp
}