import { Router } from "express";
import { UserPrisma } from "../../models/Users/User.model";
import { UserFacebookPrisma } from "../../models/Users/UserFacebook.model";
import { UserGooglePrisma } from "../../models/Users/UserGoogle.model";
import { UserFacebookTreidi } from "../../entities/Users/UserFacebook.entities";
import { UserGoogleTreidi } from "../../entities/Users/UserGoogle.entities";
import { UserTreidi, RequestUser } from "../../entities/Users/User.entities";

const router = Router();
const user = new UserPrisma();
const facebook = new UserFacebookPrisma();
const google = new UserGooglePrisma();

router.post("/", async (req, res) => {
  try {
    const { email, nombre, apellidos, genero } = req.body;
    const { provider } = req.user as RequestUser;
    if (req.user) {
      const createUser = await user.createUser({
        email,
        nombre,
        apellidos,
        genero,
      });
      const findUser = await user.findUser(email);
      if (findUser && provider === "facebook") {
        const foreignTokenFacebook = await facebook.createUser(
          req.user as UserFacebookTreidi,
          findUser.id
        );
        res.json({ user: findUser });
      } else if (findUser && provider === "google") {
        const foreignTokenGoogle = await google.createUser(
          req.user as UserGoogleTreidi,
          findUser.id
        );
      }
      res.json({ user: "User Created Successfully" });
    } else {
    }
  } catch (err) {
    res.status(500).json({ message: "Email registrado" });
  }
});

router.get("/get", async (req, res) => {
  if (req.user) {
    const { provider } = req.user as RequestUser;
    if (provider === "facebook") {
      const findUser = await facebook.findUser(req.user as UserFacebookTreidi);
      if (findUser) {
        const userTreidi = await user.findUserById(findUser.userId);
        if (userTreidi) {
          res.json({
            user: userTreidi,
            id: userTreidi.id,
            guide: userTreidi.guide,
            idFacebook: findUser.idFacebook,
          });
        }
      }
    } else if (provider === "google") {
      const findUser = await google.findUser(req.user as UserGoogleTreidi);
      if (findUser) {
        const userTreidi = await user.findUserById(findUser.userId);
        if (userTreidi) {
          res.json({
            user: userTreidi,
            id: userTreidi.id,
            guide: userTreidi.guide,
            idGoogle: findUser.idGoogle,
          });
        }
      }
    } else {
      res.json({ user: "User Not Found" });
    }
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
