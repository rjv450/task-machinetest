import express from 'express'
import { loginValidator, registerValidator, updateUserValidator } from '../validators/authValidator.js';
import { deleteUserByIdController, getUserByIdController, getUsersController, loginController, registerUserController, updateUserByIdController } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { ROLE } from '../utils/constants.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
const router = express.Router();

router.post('/create-user',protect, authorizeRoles(ROLE.ADMIN_ROLE),registerValidator,registerUserController);
//creat a user without validator
// router.post('/create-user',registerValidator,registerUserController);
router.get('/:id',protect, authorizeRoles(ROLE.ADMIN_ROLE),getUserByIdController);
router.put('/:id',protect, authorizeRoles(ROLE.ADMIN_ROLE),updateUserValidator,updateUserByIdController)
router.delete('/:id',protect, authorizeRoles(ROLE.ADMIN_ROLE),deleteUserByIdController)
router.get('/',protect, authorizeRoles(ROLE.ADMIN_ROLE),getUsersController)
export default router