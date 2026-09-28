import { initializeApp as initAdmin, cert } from 'firebase-admin/app';
import { getAuth as getAdminAuthService } from 'firebase-admin/auth';
import { initializeApp as initClient } from 'firebase/app';
import { getAuth as getClientAuth, signInWithCustomToken } from 'firebase/auth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const envPath = path.resolve('d:\\kikproject\\kicktotech-2.0\\.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  let projectId, clientEmail, privateKey, apiKey;
  for (const line of envContent.split('\n')) {
    if (line.startsWith('FIREBASE_PROJECT_ID=')) projectId = line.split('=')[1].trim();
    if (line.startsWith('FIREBASE_CLIENT_EMAIL=')) clientEmail = line.split('=')[1].trim();
    if (line.startsWith('FIREBASE_PRIVATE_KEY=')) {
        privateKey = line.substring(line.indexOf('=') + 1).trim();
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.slice(1, -1).replace(/\\n/g, '\n');
        }
    }
    if (line.startsWith('NEXT_PUBLIC_FIREBASE_API_KEY=')) apiKey = line.split('=')[1].trim();
  }

  const adminApp = initAdmin({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
  const adminAuth = getAdminAuthService(adminApp);

  const clientApp = initClient({
    apiKey,
    projectId,
  });
  const clientAuth = getClientAuth(clientApp);

  let uid;
  try {
    const userRecord = await adminAuth.createUser({
      email: 'test_token_refresh@kicktotech.in',
      password: 'password123',
      emailVerified: false,
    });
    uid = userRecord.uid;
    console.log('Created test user: ' + uid);

    const customToken = await adminAuth.createCustomToken(uid);
    const userCredential = await signInWithCustomToken(clientAuth, customToken);
    const clientUser = userCredential.user;

    const token1 = await clientUser.getIdToken();
    let decoded1 = await adminAuth.verifyIdToken(token1);
    console.log('Initial token email_verified: ' + decoded1.email_verified);

    await adminAuth.updateUser(uid, { emailVerified: true });
    console.log('Updated backend emailVerified to true.');

    await clientUser.reload();
    console.log('Client user.emailVerified after reload: ' + clientUser.emailVerified);
    
    const token2 = await clientUser.getIdToken(); 
    let decoded2 = await adminAuth.verifyIdToken(token2);
    console.log('Cached token (getIdToken()) email_verified: ' + decoded2.email_verified);

    const token3 = await clientUser.getIdToken(true); 
    let decoded3 = await adminAuth.verifyIdToken(token3);
    console.log('Refreshed token (getIdToken(true)) email_verified: ' + decoded3.email_verified);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (uid) {
      await adminAuth.deleteUser(uid);
      console.log('Cleaned up test user: ' + uid);
    }
    process.exit(0);
  }
}

run();
