import fs from 'fs'
export async function getVersion() {
    const packageJsonPath = './package.json'; // Adjust path if necessary
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');

    // Parse JSON content
    const packageJson = JSON.parse(packageJsonContent);

    // Extract and return version
    return packageJson.version;
}