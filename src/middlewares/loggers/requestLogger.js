import chalk from "chalk";

export function requestLogger(req, res, next) {
  console.log(chalk.bgYellow(`[${req.method}]`) + ` ${req.url}`);
  next();
}
