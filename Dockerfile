FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/
COPY /css /usr/share/nginx/html/css/
COPY /js /usr/share/nginx/html/js/

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
