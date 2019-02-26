#!/bin/sh

/usr/local/glassfish4/bin/asadmin start-domain
/usr/local/glassfish4/bin/asadmin -u admin deploy --name myapp --contextroot / /build.war
/usr/local/glassfish4/bin/asadmin stop-domain
/usr/local/glassfish4/bin/asadmin start-domain --verbose
