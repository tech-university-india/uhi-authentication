
const router = require('express').Router()

router.post('/deactivate')
router.post('/deactiveate/otp')

router.post('/delete')
router.post('/delete/otp')

// PROFILE ACTIONS
router.route('/').get(
  // CONTROLLER FOR GET PROFILE
).patch(
  // CONTROLLER FOR UPDATING PROFILE
)
router.post('/update/otp'
// CONTROLLER FOR OTP VERIFICATION FOR UDATING PROFILE
)

// PROFILE GET QR CODE
router.get('/qr')

module.exports = router
