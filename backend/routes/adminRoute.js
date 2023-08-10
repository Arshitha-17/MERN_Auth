import express from 'express';

import { authAdmin, logoutAdmin,adminHome,deleteUser } from '../controllers/adminController.js';

const router= express.Router();


router.post('/login',authAdmin)
router.post('/logout',logoutAdmin)
router.get('/home',adminHome);
router.post('/delete',deleteUser)


export default router;