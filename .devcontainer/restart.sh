BASE_DIR=$(pwd)

docker run -d \
  -p 8090:8090 -p 9080:9080 -p 9999:9999 -p 443:443 \
  -v $BASE_DIR/caddy/doc_build:/usr/share/caddy \
  -v $BASE_DIR/caddy/Caddyfile:/etc/caddy/Caddyfile \
  --name rhooks-caddy caddy