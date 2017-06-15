docker-compose up

sudo letsencrypt certonly --webroot -d www.sydneysunsets.com 

Saving debug log to /var/log/letsencrypt/letsencrypt.log
Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for www.sydneysunsets.com

Select the webroot for www.sydneysunsets.com:
-------------------------------------------------------------------------------
1: Enter a new webroot
-------------------------------------------------------------------------------
Press 1 [enter] to confirm the selection (press 'c' to cancel): 1
Input the webroot for www.sydneysunsets.com: (Enter 'c' to cancel):/var/www/html
Waiting for verification...
Cleaning up challenges
Unable to clean up challenge directory /var/www/html/.well-known/acme-challenge
Generating key (2048 bits): /etc/letsencrypt/keys/0000_key-certbot.pem
Creating CSR: /etc/letsencrypt/csr/0000_csr-certbot.pem

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/www.sydneysunsets.com/fullchain.pem. Your
   cert will expire on 2017-09-13. To obtain a new or tweaked version
   of this certificate in the future, simply run certbot again. To
   non-interactively renew *all* of your certificates, run "certbot
   renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le



Sydney Sunsets Frontend
=======================

Install [Yarn](https://yarnpkg.com/lang/en/) instead of sucky NPM.

## Setup
```
cd app
yarn
npm run dev
open http://localhost:8080
```

### Forked react-mapbox-gl
We use a forked version of react-mapbox-gl to support better popup UX. To setup this:

```
git clone https://github.com/liamzebedee/react-mapbox-gl app/vendor
cd app/vendor/react-mapbox-gl
yarn
npm run build
```

## Production
```
npm run build
npm start
```


Copyright Liam Edwards-Playne, Tom D'Netto 2017.

http://slides.com/sarasoueidan/building-better-interfaces-with-svg#/41
https://uxdesign.cc/top-three-ux-mobile-design-trends-82f6530e6cba
https://medium.com/google-design/redesigning-chrome-desktop-769aeb5ab987


