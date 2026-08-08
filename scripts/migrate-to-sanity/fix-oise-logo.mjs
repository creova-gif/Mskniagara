import { client } from './client.mjs';
import { uploadPublicImage } from './uploadImage.mjs';

const logo = await uploadPublicImage('/7b98ee478f466c3dd71a0410d27d1cae36bc7b2a.png');
await client.patch('communityPartner-university-of-toronto-oise').set({ logo }).commit();
console.log('✓ Fixed UofT-OISE logo');
