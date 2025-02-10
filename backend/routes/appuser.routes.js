import express from 'express';
import { protectRoute } from '../middleware/protectedRoutes.js';
import { dishouse,addhouse,myhouse,updatemyhouse,deletemyhouse } from '../controllers/alluser.controller.js';
import { rentingprotectRoute} from '../middleware/rentingprotectRoute.js';
import {rentingcheckroute } from '../middleware/rentingcheckroute.js';

const router = express.Router();

//renting
router.get('/renthouse',protectRoute,dishouse);
router.post('/addhouse',rentingprotectRoute,addhouse);
router.get('/myhouse',rentingprotectRoute,myhouse);
//now any renting broker can update any house--->should resolve this
router.put('/updatehouse/:id',rentingcheckroute ,updatemyhouse);
router.delete('/deletehouse/:id',rentingcheckroute ,deletemyhouse);

//grocery

//saloon

//service provider
export default router;