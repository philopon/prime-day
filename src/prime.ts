export default function isPrime(num: number): boolean {
    if (!Number.isInteger(num)) {
        return false;
    }

    if (num < 2) {
        return false;
    }

    if (num === 2) {
        return true;
    }

    if (num % 2 === 0) {
        return false;
    }

    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i++) {
        if (num % i === 0) return false;
    }
    return true;
}
