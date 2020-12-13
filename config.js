module.exports = exports = {
  token: process.env.NODE_ENV === 'dev' ? process.env.DEV_TOKEN : process.env.TOKEN,
  prefix: '-', // Prefix
  ownerIDs: ['id'], // Owner IDs
  guildID: 'id'
};
