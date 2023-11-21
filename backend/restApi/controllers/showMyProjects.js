import { readdirSync, existsSync, readFileSync } from "fs";
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
    let innerFiles = projects.map((project) => {
      let projectFolder = pathJoin(myProjectFolder, project);
      let files = readdirSync(projectFolder);
      return files;
    });

    let filename = pathJoin(myProjectFolder, projects[0], "index.md")
    let markdownContent = readFileSync(filename, "utf-8");

    res.json({ innerFiles, projects, markdownContent });
  });
};