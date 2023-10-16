import getAllCtrl from './getAll.js';
import getCtrl from './get.js';
import postCtrl from './post.js';
import putCtrl from './put.js';
import deleteCtrl from './delete.js';
import loginCtrls from './login.js';
import aclMiddleware from './aclMiddleware.js';

export {
  postCtrl, getAllCtrl, getCtrl,
  putCtrl, deleteCtrl, loginCtrls,
  aclMiddleware
};