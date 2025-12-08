import { StandardCheckoutClient, PhonePeException } from 'pg-sdk-node';

// Initialize the client once and export it
let phonePeClient = null;

try {
  phonePeClient = new StandardCheckoutClient({
    clientId: process.env.PHONEPE_CLIENT_ID,
    clientSecret: process.env.PHONEPE_CLIENT_SECRET,
    // Use the environment variable, defaults to 'UAT' if not set
    environment: process.env.PHONEPE_ENVIRONMENT || 'UAT', 
    clientVersion: process.env.PHONEPE_CLIENT_VERSION || 'v1', 
  });
} catch (e) {
  // Catch the exception if the client is initialized multiple times
  if (!(e instanceof PhonePeException)) {
    console.error('Failed to initialize PhonePe SDK:', e);
  }
}

export const phonePe = phonePeClient;