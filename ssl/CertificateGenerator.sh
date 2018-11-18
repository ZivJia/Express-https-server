FILENAME=$1

openssl req -new -out ${FILENAME}.csr -key private.key -subj "/C=US/ST=New York/L=Ithaca/O=Cornell ECE SocialMatric/CN=SocialMatric" -config openssl.cnf


openssl x509 -req -days 3650 -in ${FILENAME}.csr -signkey private.key -out ${FILENAME}.crt -extensions v3_req -extfile openssl.cnf

echo "${FILENAME}"
