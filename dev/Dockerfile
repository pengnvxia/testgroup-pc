FROM web_nginx:v1
RUN chown -R www.www /code
ADD nginx.conf /opt/openresty/nginx/conf/
ADD dist /code/dist
ADD init.sh /opt/
CMD ["/bin/bash","/opt/init.sh"]
