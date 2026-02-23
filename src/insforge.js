import { createClient } from '@insforge/sdk';

const insforge = createClient({
    baseUrl: process.env.REACT_APP_INSFORGE_URL,
    anonKey: process.env.REACT_APP_INSFORGE_ANON_KEY
});

export default insforge;
