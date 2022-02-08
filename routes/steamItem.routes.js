const Router = require('express');
const router = new Router();
const steamItemController = require('../controller/steamItem.controller');

router.post('/', steamItemController.createSteamItem);
router.get('/:tg_id', steamItemController.getSteamItems);
router.get('/:tg_id', steamItemController.getAllDB);
router.get('/items/:item_id', steamItemController.getOneSteamItem);
router.patch('/:item_id', steamItemController.updateSteamItem);
router.delete('/:item_id', steamItemController.deleteSteamItem);

module.exports = router;