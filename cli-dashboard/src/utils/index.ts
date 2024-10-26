
export function formatSize(bytes: number) {

    if (bytes == 0) {
        return '0.00 B';
    }

    if(bytes < 1024) {
        return Math.floor(bytes) + ' B'
    }

    let num = bytes / 1024;

    if (num <= 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(num / 1024).toFixed(2)} MB`
}
export function formatSizeToGB(size: number) {
    return `${(size / (1024 ** 3)).toFixed(2)} GB`
}