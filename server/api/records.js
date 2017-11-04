const router = require('express').Router()

router.get('/', function (req, res) {
  res.json(req.user.records)
})

router.post('/create', function (req, res) {

})

router.get('/:id', function (req, res) {

})

router.delete('/:id', function (req, res) {

})

router.put('/:id', function (req, res) {

})

module.exports = router
