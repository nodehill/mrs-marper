import { readdirSync, existsSync } from "fs";
import { dirname, join as pathJoin } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectFolder =
  pathJoin(__dirname, "..", "..", "..", "project");

export default ({ restRouter }) => {

  restRouter.get("/my-projects", (req, res) => {
    let email = req.session.user?.email;
    if (!email) {
      res.json({ error: "not logged in" });
      return;
    }
    let myProjectFolder = pathJoin(projectFolder, email);
    if (!existsSync(myProjectFolder)) {
      res.json({ error: "No project folder" });
      return;
    }
    let projects = readdirSync(myProjectFolder);
    res.json({ projects });
  });
 };