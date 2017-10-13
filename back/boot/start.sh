cd ../
mkdir db
cd ../
mkdir log
cd back/boot
mongod --config mongod.conf
cd ../../
cd htdocs/boot
node index.js