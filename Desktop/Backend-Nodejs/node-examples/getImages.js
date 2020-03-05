import fs from 'fs';
import path from 'path';

const imageFolder = path.join(__dirname, 'public/images');

export default () => {
    const items = fs.readdirSync(imageFolder);
    return items;
};