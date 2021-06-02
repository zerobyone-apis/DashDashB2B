import { FIRE, PROVIDER } from "../settings/CONST_REFS";
import { sessionsTracker } from './FirebaseQueries'


export const transformData = (res: any): UserType => {
  
  if (res.credential) {
    const userMicro: UserType = {
      id: "",
      name: "",
      email: "",
      location: "",
      businessPhones: "",
      jobTitle: "",
      accessToken: "",
      operationType: "",
    };
  
    console.log("Loggin with Single Sign On Microsoft. . .");
    const profile = res.additionalUserInfo.profile;
    const token = res.credential.accessToken;
    
    // console.log(`Res profile -> ${JSON.stringify(profile)}`);

    userMicro.id = profile.id;
    userMicro.name = profile.displayName;
    userMicro.email = profile.mail;
    userMicro.location = profile.officeLocation;
    userMicro.businessPhones = profile.businessPhones;
    userMicro.jobTitle = profile.jobTitle;
    userMicro.operationType = "Sign In";
    userMicro.accessToken = token;
    return userMicro;
  } else if (res.user) {
    
    const userWithCredentials: UserType = {
      id: "",
      name: "",
      email: "",
      accessToken: "",
      operationType: "",
    };

     // console.log(". . . . . . . .  . . . . . . . .");
     // console.log("Loggin with Email & Passwrod. . .");
     // console.log(`Este es el provider Data -> ${JSON.stringify(res.user.providerData[0])}`);
     // console.log(". . . . . . . .  . . . . . . . .");

    const uid = res.user.uid;
    const profile = res.user.providerData[0];
    const token = res.user.refreshToken;

    userWithCredentials.id = uid;
    userWithCredentials.name = !profile.displayName ? profile.email : profile.displayName; // if empty , adding the email
    userWithCredentials.email = profile.email;
    userWithCredentials.operationType = res.user.operationType
      ? res.userWithCredentials.operationType
      : "Sign In";
    userWithCredentials.accessToken = token; // refresh token
    return userWithCredentials;
  } else {

    const userLogged: UserType = {
      id: "",
      name: "",
      email: "",
      accessToken: "",
      operationType: "",
    };

    // console.log(". . . . . . . . . . . . . . . . . .");
    // console.log("Getting . . .");
    // console.log(`Este es el provider Data -> ${JSON.stringify(res.providerData[0])}`);
    // console.log(". . . . . . . . . . . . . . . . . .");

    const uid = res.uid;
    const profile = res.providerData[0];
    const token = res.refreshToken;

    userLogged.id = uid;
    userLogged.name = !profile.displayName ? profile.email : profile.displayName; // if empty , adding the email
    userLogged.email = profile.email;
    userLogged.accessToken = token; // refresh token
    userLogged.operationType = "User Logged"; 
    
    return userLogged;
  }
};

const filterMessage = (str: string) => {
  let newMessage = "";
  if (str.includes("Error getting verification code from microsoft.com response")) {
    newMessage = `This type of email is not accepted for the system, please try again with a valid enterprise email.`;
  } else {
    newMessage = str;
  }
  return newMessage;
};

export const signInWithEmailAndPassword: any = async (
  email: string,
  password: string,
) => {
  const fireRes: any = await FIRE.auth()
    .signInWithEmailAndPassword(email, password)
    .then((res: any) => {
      const user: any = transformData(res);
      sessionsTracker(user, false, false);

      localStorage.setItem("user", JSON.stringify(user))
      return user;
    })
    .catch((err: Error) => {
      console.log(`Something went wrong error_code: ${err}`);
      return err.message;
    });

  if (fireRes && fireRes.id) {
    return { code: 200, data: fireRes };
  } else {
    return { code: 400, data: fireRes };
  }
};

export const signInWithSSOMicrosoft = async () => {
  PROVIDER.setCustomParameters({
    redirectUrl: "http://localhost:8080/",
    prompt: "consent",
  });

  const response: UserType | Error = await FIRE.auth()
    .signInWithPopup(PROVIDER)
    .then((res: any) => {
      const user: UserType = transformData(res);
      console.log(`Usuario de microsoft -> ${user}`);
      
      //* params: 1 - data, 2 - isSignOutMethod? , 3 - isMicrosoftLogin? 
      sessionsTracker(user, false, true);
      
      localStorage.setItem("user", JSON.stringify(user))
      return user;
    })
    .catch((error: Error) => {
      return error;
    });

  if (response instanceof Error) {
    console.log("Error: Failure on the request -> ", response.message);
    const newMessage = filterMessage(response.message);
    return { code: 400, data: newMessage };
  } else {
    return { code: 200, data: response };
  }
};

export const createUserWithEmailAndPassowrd = async (
  email: string,
  password: string,
) => {
  const response: UserType | string = await FIRE.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const user: UserType = transformData(res);
      
      sessionsTracker(user, false, false);
      localStorage.setItem("user", JSON.stringify(user))
      return user;
    })
    .catch((error: Error) => {
      console.error("Error: ", error.message);
      return error.message;
    });

    
  if (response instanceof String) {
    return { code: 400, data: response };
  } else {
    return { code: 200, data: response };
  }
};

export interface UserType {
  id: string | number;
  name: string;
  email: string;
  location?: string;
  businessPhones?: string;
  jobTitle?: string;
  accessToken: string;
  operationType?: string;
}


