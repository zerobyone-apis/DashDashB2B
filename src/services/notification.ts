import { MESSAGING } from '../settings/CONST_REFS';

const sendNotification = async (RecipientTo: string, message: any) => {
  const key =
    'AAAATpK521w:APA91bE3As4EMnHdxdUYBAKZXstqkXIs2H9x4ZtVrwc5loWUUp_fUK-GodZF4yr8g-EA7wr9l9c5M0eAJ9bLREVW0x-orpBV4Zn_0ncaE80nF94ROnYQ7Sp8NzeTNKAjhb2YOfPCJ4Rb';
  const notify = {
    title: message.title,
    body: message.body,
    icon: message.icon,
    clickAction: 'http://localhost:8080/dashboard',
  };

  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Authorization': 'key=' + key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notification: notify,
      to: RecipientTo,
    }),
  })
    .then((response) => {
      console.log('Response notification success 😁 ');
    })
    .catch((error) => {
      console.error('Error response -> ', error);
    });
};

export const pushNotifcation = async (info: any) => {
  try {
    const token = await MESSAGING.requestPermission()
      .then(() => {
        // console.log('Tiene permisos');
        return MESSAGING.getToken();
      })
      .then((tokenResp: any) => {
        if (tokenResp) {
          // console.log('Este es el token del usuario: ', token);
          return tokenResp;
        }
      })
      .catch((error: Error) => {
        console.log('This is the error -> ', error);
      });

    const payload: any = {
      title: info.title,
      body: info.body,
      icon: info.icon,
    };

    if (token) {
      console.log('Sending notification...🚀');
      sendNotification(token, payload);
    }

    MESSAGING.onTokenRefresh(() => {
      MESSAGING.getToken()
        .then((refreshedToken) => {
          console.log('Token refreshed.', refreshedToken);
        })
        .catch((err) => {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    MESSAGING.onMessage((payload) => {
      console.log(`Message received 🔥 `, payload);

      const notificationOption = {
        body: payload.notification.body,
        icon: payload.notification.icon,
      };
      if (Notification.permission === 'granted') {
        const notification = new Notification(
          payload.notification.title,
          notificationOption,
        );
        notification.onclick = (ev) => {
          ev.preventDefault();
          window.open(payload.notification.clickAction, '_blank');
          notification.close();
        };
      }
    });
  } catch (error) {
    console.error(`Error is ${error}`);
  }
};


