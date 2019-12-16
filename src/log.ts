// const chalk = require("chalk");
import chalk from "chalk";

const log = {
  info: (msg: string) => console.log(`${chalk.bgGreen.black(" INFO ")} ${msg}`),
  warn: (msg: string) =>
    console.log(`${chalk.bgYellow.black(" WARN ")} ${msg}`),
  skip: (msg: string) => console.log(`${chalk.bgGray(" SKIP ")} ${msg}`),
  error: (msg: string) => console.log(`${chalk.bgRed.black(" ERROR ")} ${msg}`)
};

export default log;
