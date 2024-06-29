import fs from 'fs';
import path from 'path';

export async function getFileTree(dirPath) {
    const result = [];

    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isFile()) {
            result.push({
                isFile: true,
                path: itemPath,
                name: item
            });
        } else if (stat.isDirectory()) {
            result.push({
                isFile: false,
                path: itemPath,
                name: item,
                children: await getFileTree(itemPath) // Recursively build the tree
            });
        }
    }

    // Custom sort function
    result.sort((a, b) => {
        // Sort directories before files
        if (!a.isFile && b.isFile) return -1;
        if (a.isFile && !b.isFile) return 1;

        // Special case for 'img.png' to be first among files
        if (a.isFile && a.name === 'img.png') return -1;
        if (b.isFile && b.name === 'img.png') return 1;

        // Ensure that both names exist before comparing
        if (a.name && b.name) {
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        }

        // Fallback if one of the names is undefined
        if (!a.name) return -1;
        if (!b.name) return 1;

        return 0;
    });

    return result;
}

