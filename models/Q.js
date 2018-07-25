'use strict';

const createChannelTable = `CREATE TABLE IF NOT EXISTS channels (
	name            TEXT    NOT NULL,
	password	      INTEGER NOT NULL,
	url	            TEXT    NOT NULL UNIQUE,
  description	    TEXT    NOT NULL,
  headerSize      INTEGER NOT NULL,
  visible         INTEGER NOT NULL DEFAULT 1
);`;

const createSplitterTable = `CREATE TABLE IF NOT EXISTS splitter (
	splitterUrl TEXT    NOT NULL,
	splitterAddress TEXT    NOT NULL,
	splitterAvailable INTEGER NOT NULL DEFAULT 1
);`;

const selectAllChannels = `SELECT name, url, description
  FROM channels
  WHERE VISIBLE = 1
  LIMIT @limit OFFSET @offset`;

const selectChannel = `SELECT name, description
  FROM channels WHERE url = (?)`;

const selectSplitter = `SELECT splitterAddress
  FROM splitter WHERE splitterUrl = (@url) AND splitterAvailable = 1`;

const insertChannel = `INSERT INTO channels VALUES (
  @name, @password, @url, @description, @headerSize, 1 )`;

const insertSplitter = `INSERT INTO splitter VALUES (
  @url, @iterSplitterAddress)`;

const updateChannel = `UPDATE channels
  SET name = @name, description = @description
  WHERE url = @url`;

const deleteChannel = 'DELETE FROM channels,splitters WHERE url = (?)';

const selectHash = 'SELECT password FROM channels WHERE url = (?)';

const updateSplitterAvailable  = `UPDATE splitter
  SET splitterAvailable = @splitterAvailable
  WHERE splitterAddress = @splitterAddress`;

module.exports = {
  createChannelTable,
  createSplitterTable,
  selectAllChannels,
  selectChannel,
  selectSplitter,
  insertChannel,
  insertSplitter,
  updateChannel,
  deleteChannel,
  selectHash,
  updateSplitterAvailable
};
