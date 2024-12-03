const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const authenticateJWT = require('../middlewares/authMiddleware');


router.post('/',authenticateJWT, medicineController.createMedicine);

router.get('/',authenticateJWT,medicineController.getMedicines);
router.get('/:id',authenticateJWT, medicineController.getMedicineById);

router.put('/:id',authenticateJWT, medicineController.updateMedicine);

router.delete('/:id',authenticateJWT, medicineController.deleteMedicine);

module.exports = router;
