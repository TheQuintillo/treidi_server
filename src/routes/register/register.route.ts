import { Router } from "express";
import { UserPrisma } from "../../models/Users/User.model";
import { UserTreidi } from "@src/entities/Users/User.entities";
import { UserFacebookPrisma } from "../../models/Users/UserFacebook.model";
import { UserGooglePrisma } from "../../models/Users/UserGoogle.model";
import { RequestUserFacebook } from "@src/entities/Users/UserFacebook.entities";
import { RequestUserGoogle } from "@src/entities/Users/UserGoogle.entities";

const router = Router();
const user = new UserPrisma();
const userFacebook = new UserFacebookPrisma();
const userGoogle = new UserGooglePrisma();

router.post("/", async (req, res) => {
  try {
    const { email, name, apellidos, genero } = req.body;

    if (req.user) {
      const findUser = await user.findUserEmail(email);
      if (findUser) {
        if (findUser.idGoogle) {
          const findUserFacebook = await userFacebook.findUser(
            req.user as RequestUserFacebook
          );
          return await user.updateUser(email, {
            idFacebook: findUserFacebook?.idFacebook,
            name: name,
            email: email,
            apellidos: apellidos,
            genero: genero,
            provider: "facebook",
          });
        } else if (findUser.idFacebook) {
          const findUserGoogle = await userGoogle.findUser(
            req.user as RequestUserGoogle
          );
          return await user.updateUser(email, {
            idGoogle: findUserGoogle?.idGoogle,
            name: name,
            email: email,
            apellidos: apellidos,
            genero: genero,
          });
        }
      } else {
        return await user.updateUserFirst(req.user, {
          name: name,
          email: email,
          apellidos: apellidos,
          genero: genero,
        });
      }
    }

    res.json({ user: req.user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get", async (req, res) => {
  if (req.user) {
    const findGuide = await user.findUserId(req.user as UserTreidi);
    if (findGuide?.provider === "facebook") {
      res.json({
        user: req.user,
        idFacebook: findGuide?.idFacebook,
        id: findGuide?.id,
        guide: findGuide?.guide,
      });
    } else if (findGuide?.provider === "google") {
      res.json({
        user: req.user,
        idGoogle: findGuide?.idGoogle,
        id: findGuide?.id,
        guide: findGuide?.guide,
      });
    }
  } else {
    res.json({ msg: "Empty" });
  }
});

router.put("/updateGuide", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    const update = await user.updateGuide(userId);
    res.json({ update: update });
  } catch (error) {
    console.error("Error al actualizar el guide:", error);
    res
      .status(500)
      .json({ success: false, error: "Error al actualizar el guide" });
  }
});

export default router;
