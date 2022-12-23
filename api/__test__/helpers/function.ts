import util from "util";

const exec = util.promisify(require("child_process").exec);

export const resetDatabase = async (): Promise<void> => {
  await exec("npx prisma migrate reset --skip-seed --force");
};
