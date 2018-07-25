'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cntrl = require('../controllers/frontendController');
const check = require('../controllers/validators/channelValidator');
const chnl = require('../controllers/channelController.js')

router.use(helmet());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', [check.list, cntrl.renderAllChannels]);
router.get('/add', cntrl.renderAddChannelForm);
router.post('/add', [check.frontendAdd, cntrl.addChannel]);
router.get('/edit', cntrl.renderEditChannelForm);
router.post('/edit', [check.edit, check.auth, cntrl.editChannel]);
router.get('/remove', cntrl.renderRemoveChannelForm);
router.post('/remove', [check.remove, check.auth, cntrl.removeChannel]);
router.get('/:channelUrl', cntrl.renderAChannel);
router.get('/channel/:channelUrl',chnl.getChannel);
router.get('/splitterAvailable/:splitterAddress/:splitterAvailable', chnl.updateSplitterAvailable);

module.exports = router;
