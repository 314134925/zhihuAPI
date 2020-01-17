const jwt = require('koa-jwt')
const {secret} = require('../config')
const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {
  find, 
  findById, 
  delete:del, 
  created, 
  updated, 
  login,
  checkOwner,
  checkUserExist,
  listFollowing,
  follow,
  unfollow,
  listFollowers
} =  require('../controllers/users')
const auth = jwt({secret}) 
router.get('/', find)
router.post('/', created)
router.get('/:id',findById)
router.patch('/:id', auth, checkOwner, updated)
router.delete('/:id', auth, checkOwner, del)
router.post('/login',login)
router.get('/:id/following',listFollowing)
router.get('/:id/followers',listFollowers)
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/unfollow/:id', auth,checkUserExist, unfollow)

module.exports = router