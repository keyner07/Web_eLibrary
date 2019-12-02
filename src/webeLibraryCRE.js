const { auth } = require('google-auth-library');

const keysEnvVar = process.env['CREDS'];

if(!keysEnvVar) {
    throw new Error('Las credenciales no fueron encontradas');
}

const keys = JSON.parse(keysEnvVar);

async function main() {
    const client = await auth.fromJSON(keys);
    client.scopes = ['https://www.googleapis.com/auth/cloud-platform'];
    const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
    const res = await client.request({ url });
    console.log(res.data);
}

main().catch(console.error);