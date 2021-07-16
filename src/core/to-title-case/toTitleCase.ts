export default function toTitleCase(input: string): string {
    return `${input.toUpperCase()[0]}${input.toLowerCase().slice(1)}`
}