export const getRandomDarkColor =()=>{
    const maxComponentValue = 150;
    const r = Math.floor(Math.random() * maxComponentValue);
    const g = Math.floor(Math.random() * maxComponentValue);
    const b = Math.floor(Math.random() * maxComponentValue);
    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}