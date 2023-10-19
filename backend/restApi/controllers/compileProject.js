import { existsSync } from 'fs';
import { exec } from 'child_process';
import { dirname, join as pathJoin } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const projectFolder =
  pathJoin(__dirname, "..", "..", "..", "project");

export default ({ restRouter }) => {

  restRouter.get('/compileProject/:projectName', async (req, res) => {
    let { projectName } = req.params;
    let loggedInEmail = req.session.user?.email;

    if (!loggedInEmail) {
      res.json({ error: 'not logged in' });
      return;
    }

    let folder = pathJoin(projectFolder, loggedInEmail, projectName);

    if (!existsSync(folder)) {
      res.json({ error: 'could not find project' });
      return;
    }

    const toRun = 'node ' +
      pathJoin(__dirname, "..", "..", "..", "make", "_index.js")
      + ` "${loggedInEmail}" "${projectName}"`;

    exec(
      toRun,
      (err, stdout, stderr) => {
        console.log("err", err);
        console.log("stdout", stdout);
        console.log("stderr", stderr);
        res.json(err || stderr ?
          { error: err || stderr } :
          {success: stdout}
        )
      }
    );

  });

}

// http://127.0.0.01:5002/api/compileProject/test
// Skapa en ny route i backend som heter list my projects som listar alla projekt som är kopplade till den inloggade användaren