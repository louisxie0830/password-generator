

export default function getRandomChar(chars: string) {
    const index = Math.floor(Math.random() * chars.length);
    return chars[index];
}
