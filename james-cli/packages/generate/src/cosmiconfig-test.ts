import { cosmiconfig, cosmiconfigSync } from 'cosmiconfig';
import path from 'node:path'

const explorer = cosmiconfig('abc');

async function main() {
    const res = await explorer.search(path.join(import.meta.dirname, '../'))
    console.log('res', res?.config)
}
main()