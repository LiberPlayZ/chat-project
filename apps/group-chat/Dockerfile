FROM 192.168.1.50:8082/nginx:stable-alpine
COPY dist/apps/group-chat/* /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
