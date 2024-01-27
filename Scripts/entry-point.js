import { entryPointFun } from "./Entry-data/entry-validation.js";
import { loginData } from "./Login.data/login.js";

entryPointFun();
if (loginData) {
  location.replace('account.html')
}