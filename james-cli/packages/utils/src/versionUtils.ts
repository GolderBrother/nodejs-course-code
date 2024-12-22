import axios from 'axios'
import urlJoin from 'url-join'

const NPM_REGISTRY_URL = 'https://registry.npmmirror.com';

function getNpmRegistry() {
    return NPM_REGISTRY_URL;
}
/**
 * 获取指定包的完整信息
 * @param packageName - 包名
 * @returns - 返回包的完整信息
 */
const getNpmInfo = async (packageName: string): Promise<any | null> => {
    try {
        // 这里用 urlJoin 来连接 url，不用自己处理 / 结尾和不是 / 结尾的情况
        const npmRegistry = getNpmRegistry();
        const response = await axios.get(urlJoin(npmRegistry, packageName));
        if (response.status === 200) {
            return response.data; // 返回完整的包信息
        }
    } catch (error) {
        console.error(`获取包 ${packageName} 的信息时出错:`, error);
        return Promise.reject(error);
    }
};

async function getLatestVersion(packageName: string) {
    const data = await getNpmInfo(packageName);
    return data['dist-tags'].latest;
}

async function getVersions(packageName: string) {
    const data = await getNpmInfo(packageName);
    return Object.keys(data.versions);
}

export {
    getNpmRegistry,
    getNpmInfo,
    getLatestVersion,
    getVersions
}