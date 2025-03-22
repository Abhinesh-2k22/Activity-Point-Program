import express from 'express';
import { protectRoute } from '../middleware/protectedRoutes.js';
import { dishouse,addhouse,myhouse,updatemyhouse,deletemyhouse,addgrocery,getallgrocery,mygrocery,updatemygrocery,deletemygrocery } from '../controllers/alluser.controller.js';
import { rentingprotectRoute} from '../middleware/rentingprotectRoute.js';
import {rentingcheckroute } from '../middleware/rentingcheckroute.js';
import { groceryprotectRoute } from '../middleware/groceryprotectRoute.js';
import { getallsaloon,addsaloon,mysaloon,updatemysaloon,deletemysaloon,getAvailableSlots,bookAppointment} from '../controllers/alluser.controller.js';
import { saloonprotectRoute } from '../middleware/saloonprotectRoute.js';
import { addservice,getallservice,myservice,updatemyservice,deletemyservice} from '../controllers/alluser.controller.js';
import {serviceprotectRoute} from '../middleware/serviceprotectRoute.js';
import { salooncheckRoute } from '../middleware/salooncheckRoute.js';



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
router.get('/saloon',protectRoute,getallsaloon);
router.post('/addsaloon',saloonprotectRoute,addsaloon);
router.get('/mysaloon',saloonprotectRoute,mysaloon);
router.put('/updatesaloon/:id',salooncheckRoute,updatemysaloon);
router.delete('/deletesaloon/:id',salooncheckRoute,deletemysaloon);

// Appointment Booking Routes
router.post('/book-appointment/:id', protectRoute, bookAppointment);
router.get("/available-slots/:id", protectRoute, getAvailableSlots);

//service provider
router.get('/service',protectRoute,getallservice);
router.post('/addservice',serviceprotectRoute,addservice);
router.get('/myservice',serviceprotectRoute,myservice); 
router.put('/updateservice/:id',serviceprotectRoute,updatemyservice);
router.delete('/deleteservice/:id',serviceprotectRoute,deletemyservice);
export default router;