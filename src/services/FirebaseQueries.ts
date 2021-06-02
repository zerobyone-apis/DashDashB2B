import { component } from "vue/types/umd";
import { DateTime } from "luxon";
import { DB, SERVER_TIMESTAMP } from "../settings/CONST_REFS";

export interface UserInfo {
  id?: string;
  email: string;
  phone: string | number;
  fullName: string;
  team:
    | "MEDIA"
    | "ADOPS"
    | "ATENDIMIENTO"
    | "PLATAFORMA"
    | "FINANCIERO"
    | "BI - DATOS";
  rol: "Supervisor" | "Agent";
  isCreator: boolean;
  isAdmin: boolean;
  avatarUrl: string;
  createdOn: string | Date;
  updatedOn: string | Date;
}

//! Track the user loggin
export const sessionsTracker = async (
  info: any,
  signout: boolean,
  isMicrosoft: boolean
) => {
  console.log("user obtenido -> ", info);
  let newSession = {};

  console.log("Sign out value -> ", signout);
  if (!signout) {
    if (isMicrosoft) {
      newSession = info;
    } else {
      const id = info.id ? String(info.id) : 1;
      newSession = {
        id: id,
        username: info.name,
        event: info.operationType,
        startSession: SERVER_TIMESTAMP,
      };
    }
  } else {
    console.log("sign out true", signout);
    // Just for Microsoft loggins
    if (isMicrosoft) {
      newSession = info;
    } else {
      const id = info.id ? info.id : 1;
      newSession = {
        id: id,
        username: info.name,
        event: "Sign Out",
        startSession: SERVER_TIMESTAMP,
      };
    }
  }

  console.log("New Session to save -> ", newSession);
  await DB.collection("user")
    .doc("events")
    .collection("sessions")
    .doc()
    .set(newSession)
    .then((res: any) => {
      console.log("Session save it successfuly!", JSON.stringify(res));
      return res;
    })
    .catch((err: Error) => {
      console.log("Error: ", err);
      console.log("Error Message: Saving this session: ", err.message);
      return err;
    });
};

//* Filter User to Firestore doc
const filterUserInfo = (info: any, isAnUpdate: boolean) => {
  const createdOn = DateTime.local().toLocaleString();
  const updateOn = isAnUpdate ? DateTime.local().toLocaleString() : "";
  const user: UserInfo = {
    id: info.id ? info.id : "",
    email: info.email,
    phone: info.phone,
    fullName: info.fullName,
    team: info.team,
    rol: info.rol,
    isCreator: info.isCreator,
    isAdmin: info.isAdmin,
    avatarUrl: info.avatarUrl,
    createdOn:  createdOn,
    updatedOn: updateOn
  };
  return user;
};

//* Find User Query - By email
export const findUser = async (email?: string) => {
  try {
  const resp: any = [];
  await DB.collection("info")
    .where("email", "==", email)
    .get()
    .then((querySnapshot: any) => {
      console.log({...querySnapshot}, "This is the user founded -> ");
      
      querySnapshot.forEach((doc: any) => {
        console.log(doc.id, "This is the user founded -> ", doc.data());
        return resp.push(doc.data());
      });
    })
    .catch((err: Error) => {
      console.log("Error: ", err);
      console.log("Message: User not found -> ", err.message);
      return err;
    });
    
    if(resp){
      // console.log("User Founded!" , resp[0]);
      // console.log("User Founded!" , {...resp});
      return { code: 200, data: resp, message: ""}
    }  
  } catch (error) {
    console.error(error.message);
    return { code: 400, data: {}, message: error?.message}
  }
};

//* Create Add User Query
export const createUser = async (info: any) => {
  try {
    const user: UserInfo = await filterUserInfo(info, false);
    const resp = await DB.collection("user")
      .doc(`info/${user.email}`)
      .set(user)
      .then((res: any) => {
        console.log("User save it successfuly!", JSON.stringify(res));
        return res;
      })
      .catch((err: Error) => {
        console.log("Error: ", err);
        console.log("Message: Saving this user -> ", err.message);
        return err;
      });
      if(resp){
        console.log("User Saved! ok");
        console.log("Resp", resp);
        return { code: 200, data: resp, message: ""}
      }
    } catch (error) {
      console.error(error.message);
      return { code: 200, data: {}, message: error?.message}
  }
};

//* Create Add User Query
export const updateUser = async (info: any) => {
  try {
    const user: UserInfo = await filterUserInfo(info, true);
    const resp = await DB.collection("user")
      .doc(`info/${user.email}`)
      .update(user)
      .then((res: any) => {
        console.log("User save it successfuly!", JSON.stringify(res));
        return res;
      })
      .catch((err: Error) => {
        console.log("Error: ", err);
        console.log("Message: Saving this user -> ", err.message);
        return err;
      });
      if(resp){
        console.log("User Saved! ok");
        console.log("Resp", resp);
        return { code: 200, data: resp, message: ""}
      }
    } catch (error) {
      console.error(error.message);
      return { code: 200, data: {}, message: error?.message}
  }
};

//! Create user doc.
export const userBackUp = (info: any) => {

  //? check if User Exist.
  const exist = findUser(info.email);
  if(exist){
    console.log('User exist, updating it');
    const updatedUser: any = updateUser(info);
    if(updatedUser.code === 200)
    console.log('User updated -> ', updatedUser.data);
  } else {
    const user: any = createUser(info);
    if(user.code === 200){
      console.log('User Created!!');
      console.log('User info -> ', user.data);
    }
  }
  
}