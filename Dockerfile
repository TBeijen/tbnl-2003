FROM tutum/lamp:latest
ADD mysql-setup.sh /mysql-setup.sh
RUN rm -fr /app &&\
    mkdir /app &&\
    git clone https://github.com/TBeijen/tbnl-2003.git /tbnl_2003 &&\
    ln -s /tbnl_2003/public /app/anno2003 &&\
    chmod 755 /*.sh
EXPOSE 80
CMD ["/run.sh"]