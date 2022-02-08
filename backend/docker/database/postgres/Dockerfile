FROM postgres

RUN sed -i -e 's/# es_ES.UTF-8 UTF-8/es_ES.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen
ENV LANG es_ES.UTF-8 
ENV LANGUAGE es_ES:es
ENV LC_ALL es_ES.UTF-8

WORKDIR /home