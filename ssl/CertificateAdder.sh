openssl x509 -in SocialMatric.cer -inform DER -out SocialMatric.pem -outform PEM

rm SocialMatric.cer

mv SocialMatric.pem ../../SensorPackage/app/src/main/assets
