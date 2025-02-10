import express from 'express';
import { protectRoute } from '../middleware/protectedRoutes.js';
import { dishouse,addhouse,myhouse,updatemyhouse,deletemyhouse,addgrocery,getallgrocery,mygrocery,updatemygrocery,deletemygrocery } from '../controllers/alluser.controller.js';
import { rentingprotectRoute} from '../middleware/rentingprotectRoute.js';
import {rentingcheckroute } from '../middleware/rentingcheckroute.js';
import { groceryprotectRoute } from '../middleware/groceryprotectRoute.js';

const router = express.Router();

//renting
router.get('/renthouse',protectRoute,dishouse);
router.post('/addhouse',rentingprotectRoute,addhouse);
router.get('/myhouse',rentingprotectRoute,myhouse);
router.put('/updatehouse/:id',rentingcheckroute ,updatemyhouse);
router.delete('/deletehouse/:id',rentingcheckroute ,deletemyhouse);

//grocery
router.get('/grocery/:category',protectRoute,getallgrocery);
router.post('/addgrocery',groceryprotectRoute,addgrocery);
router.get('/mygrocery',groceryprotectRoute,mygrocery);
router.put('/updategrocery/:id',groceryprotectRoute,updatemygrocery);
router.delete('/deletegrocery/:id',groceryprotectRoute,deletemygrocery);

//saloon

//service provider
export default router;