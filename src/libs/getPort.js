import detect from 'detect-port';

export async function getDynamicPort() {
    let initialPort = 8800;
    let port = await detect(initialPort);

    while (port !== initialPort) {
        console.log(`port ${initialPort} is already in use.`)
        initialPort++;
        console.log(`trying for port ${initialPort}`)
        port = await detect(initialPort);
    }

    return port;
}


export const DYNAMIC_PORT = await getDynamicPort()