const Router = require('express');
const router = new Router();
const steamItemController = require('../controller/steamItem.controller');

router.post('/', steamItemController.createSteamItem);
router.get('/', steamItemController.getSteamItems);
router.get('/:id', steamItemController.getOneSteamItem);
router.put('/:id', steamItemController.updateSteamItem);
router.delete('/:id', steamItemController.deleteSteamItem);

module.exports = router;