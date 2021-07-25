export default {
  token:
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_TOKEN
      : process.env.TOKEN,
  prefix: '-', // Prefix
  ownerIDs: ['id'], // Owner IDs
  guildID: 'id',
};

export interface configInterface {
  token: string;
  prefix: string;
  ownerIDs: string[];
  guildID: string;
  [key: string]: unknown;
}
