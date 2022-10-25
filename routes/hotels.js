import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, getHotleRoom, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


//create
router.post('/',verifyAdmin, createHotel)


//update
router.put('/find/:id',verifyAdmin, updateHotel)


//delete
router.delete('/:id',verifyAdmin, deleteHotel)


//getOne
router.get('/find/:id', getHotel)


//getAll
router.get('/', getHotels)

router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotleRoom)

export default router;