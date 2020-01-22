import * as bcrypt from 'bcrypt';

export async function encrypt(data: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const encryptedData = await bcrypt.hash(data, salt);

  return encryptedData;
}

export async function compareEncryption(data: string, hash: string) {
  const isSame = await bcrypt.compare(data, hash);

  return isSame;
}