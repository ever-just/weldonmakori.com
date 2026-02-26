import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://weldonmakori.com/pb';

const pb = new PocketBase(POCKETBASE_URL);

export default pb;
