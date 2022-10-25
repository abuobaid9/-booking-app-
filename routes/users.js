import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin ,verifyUser} from '../utils/verifyToken.js';
const router = express.Router();

// router.get('/checkauthentication',verifyToken,(req,res,next)=>{
// res.send("You Are Login")
// })

// router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
// res.send("You Are Login and you can delete your account")
// })
// router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
// res.send("hello Admin, You Are Login and you can delete all accounts")
// })

//create
router.post('/', createUser)


//update
router.put('/:id',verifyUser, updateUser)


//delete
router.delete('/:id',verifyUser, deleteUser)


//getOne
router.get('/:id',verifyUser, getUser)


//getAll
router.get('/',verifyAdmin, getUsers)

export default router;