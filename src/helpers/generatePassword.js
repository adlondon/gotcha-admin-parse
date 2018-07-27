function generatePassword() {
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowers = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let password = "";
  for (let i = 0; i < 2; i++) {
    password += uppers.charAt(Math.floor(Math.random() * uppers.length));
  }
  for (let i = 0; i < 2; i++) {
    password += lowers.charAt(Math.floor(Math.random() * uppers.length));
  }
  for (let i = 0; i < 3; i++) {
    password += `${numbers.charAt(Math.floor(Math.random() * uppers.length))}`;
  }
  return `${password}!`;
}

export default generatePassword;
