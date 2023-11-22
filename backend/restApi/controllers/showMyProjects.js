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
    // TODO: Read the markdown file and send it to the frontend in a list
    let filename = pathJoin(myProjectFolder, projects[0], "index.md")
    let markdownContent = readFileSync(filename, "utf-8");
    let filename2 = pathJoin(myProjectFolder, projects[1], "index.md")
    let markdownContent2 = readFileSync(filename2, "utf-8");
    let filename3 = pathJoin(myProjectFolder, projects[2], "index.md")
    let markdownContent3 = readFileSync(filename3, "utf-8");

    res.json({ innerFiles, projects, markdownContent, markdownContent2, markdownContent3 });
  });
};