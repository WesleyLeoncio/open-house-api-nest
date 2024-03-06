import * as bcrypt from 'bcrypt';

export class Bcrypt {

  static async passwordHash(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  static async checkPassword(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }

}