const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCvlKR-0-3JlktEdZATI40WfP2mEUrq3lBrfppZ9p2_bDaFRy9l-YTFPhNdoqJGNGIX4Q0h8mX7fJgJi_q4YWtU",
   "privateKey": "18Im-7WIMWn72y3eIZTF8mIueEzszXdCECDUV4PJi7Q"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAACtK5XoD9O0ZkK5pM%2f3zQkrn4Bf1QdxUtWSJ9g0Gc8L48mvJRiIKFYXKhRjhcLLyL3p9dK7l%2boAiltFKMpNOl8%2f3S4sIyRcQcMyIDR5obZ0unOgfRB4ggRqPD1BomYSwcTDwiHm0M%2flm7dOnijSemeDK%2fftUJp%2bU%2bkwFjCYnmWS8XP78%2fBa4nbYFukFuIm7oWjls18wRjHT69DsWiVkrPb2rvuoUxjY9vMgfXnYtfYZ6%2bqakXsayJdgpQGYcvQ%2bQujosKIi35ykQpUOFaPZJuefkcczXTIvjEqIwjrMpYaOwgfw8G34zRBvYXN4B63bDzw%3d",
   "keys": {
       "p256dh": "BBHcgJ42lWvhamkv13XBDlzjheWdyBDyICpOU9Qh54Lz5P742tarBf6MnsUtZUjw46u5I/KTiYLGKZGseoXr+ec=",
       "auth": "wSsn2bHXAlsKexsxncadIw=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '273459238440',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
