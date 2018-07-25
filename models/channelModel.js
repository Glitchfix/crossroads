'use strict';

const logger = require('kaho');
const Q = require('./Q');

let db = undefined;

const setDB = database => {
  db = database;
};

const start = () => {
  db.prepare(Q.createChannelTable).run();
  db.prepare(Q.createSplitterTable).run();
};

const getAllChannels = (limit = 20, offset = 0) => {
  try {
    return db.prepare(Q.selectAllChannels).all({ limit, offset });
  } catch (e) {
    logger('WARNING', 'getAllChannels() crash', e);
    return false;
  }
};

const getChannel = url => {
  try {
    return db.prepare(Q.selectChannel).get(url);
  } catch (e) {
    logger('WARNING', 'getChannel() crash', e);
    return false;
  }
};

const getSplitter = url => {
  try {
	  var splitters=db.prepare(Q.selectSplitter).all({url});
	  for(var i=0;i<splitters.length;i++){
		  splitters[i]=String(splitters[i].splitterAddress);
	  }
    return splitters;
  } catch (e) {
    logger('WARNING', 'getSplitter() crash', e);
    return false;
  }
};

const addChannel = channel => {
  try {
    db.prepare(Q.insertChannel).run(channel);
    for(var i=0;i<channel.splitterCount;i++){
		channel.iterSplitterAddress=channel.splitterAddress[i];
		db.prepare(Q.insertSplitter).run(channel);
	}
    return true;
  } catch (e) {
    logger('WARNING', 'addChannel() crash', e);
    return false;
  }
};

const getChannelHash = url => {
  try {		
    return db.prepare(Q.selectHash).get(url);
  } catch (e) {
    logger('WARNING', 'getChannelHash() crash', e);
    return null;
  }
};

const editChannel = (url, newChannel) => {
  try {
    newChannel.url = url;
    db.prepare(Q.updateChannel).run(newChannel);
    return true;
  } catch (e) {
    logger('WARNING', 'editChannel() crash', e);
    return false;
  }
};

const removeChannel = url => {
  try {
    db.prepare(Q.deleteChannel).run(url);
    return true;
  } catch (e) {
    logger('WARNING', 'removeChannel() crash', e);
    return false;
  }
};

const updateSplitterAvailable = (splitter) => {
	try{
		db.prepare(Q.updateSplitterAvailable).run(splitter);
	} catch (e) {
		logger('WARNING', 'updateSplitterAvailable() crash', e);
	}
};

module.exports = {
  setDB,
  start,
  getAllChannels,
  getChannel,
  getSplitter,
  addChannel,
  getChannelHash,
  editChannel,
  removeChannel,
  updateSplitterAvailable
};
