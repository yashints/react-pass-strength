
const pwnedPasswordsApiUrl = "https://api.pwnedpasswords.com";

export const checkHIBPForAnyBreach = (passwordHash: string): Promise<string> => {
    return fetch(`${pwnedPasswordsApiUrl}/range/${passwordHash}`)
    .then(response => response.text());
}