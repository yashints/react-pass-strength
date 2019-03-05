const hash = "A94A8";
const dummyHashes = `FDFAEE848356AD27F8FB494E5C1B11956C2:2\r\nFE5CCB19BA61C4C0873D391E987982FBBD3:74831\r\nFF36DC7D3284A39991ADA90CAF20D1E3C0D:1\r\nFFF983A91443AE72BD98E59ADAB93B31974:2`;

export const checkHIBPForAnyBreach = (passwordHash: string) => {
  return new Promise((resolve, reject) => {
    if (passwordHash === hash) {
      resolve(dummyHashes);
    } else {
      reject({});
    }
  });
};
