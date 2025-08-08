export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

//function validate and check url
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
