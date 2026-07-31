FROM php:8.3-apache

COPY docker/apache-cusb.conf /etc/apache2/conf-available/cusb.conf
COPY api/ /var/www/html/api/

RUN a2enmod rewrite && a2enconf cusb
