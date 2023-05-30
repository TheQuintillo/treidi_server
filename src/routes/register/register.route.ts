import { Router } from "express";
import { UserPrisma } from "../../models/Users/User.model";
import { UserFacebookPrisma } from "../../models/Users/UserFacebook.model";
import { UserGooglePrisma } from "../../models/Users/UserGoogle.model";
import { RequestUserFacebook } from "@src/entities/Users/UserFacebook.entities";
import { RequestUserGoogle } from "@src/entities/Users/UserGoogle.entities";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const user = new UserPrisma();
    const userFacebook = new UserFacebookPrisma();
    const userGoogle = new UserGooglePrisma();
    const create = await user.createUser(req.body);

    if (req.user) {
      const findUserFacebook = await userFacebook.findUser(
        req.user as RequestUserFacebook
      );
      const findUserGoogle = await userGoogle.findUser(
        req.user as RequestUserGoogle
      );
      if (findUserFacebook)
        return await userFacebook.updateUser(findUserFacebook.id, email);
    }

    res.json({ user: req.user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get", (req, res) => {
  console.log(req.user);
  res.json({ user: req.user });
});

export default router;
