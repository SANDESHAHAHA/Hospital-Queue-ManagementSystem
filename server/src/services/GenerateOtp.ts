import crypto from "crypto";

const generateOtp = (): string => {
  return crypto.randomInt(100000, 1000000).toString(); // 6 digits
};

export default generateOtp;