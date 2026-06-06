#!/usr/bin/env bash
#
# One-time VPS provisioning for the Kangaroo Logistics homepage.
# Run this ONCE on the VPS as root (Ubuntu 24.04):
#
#   ssh root@187.124.170.65
#   git clone <repo> /tmp/kangaroo && cd /tmp/kangaroo
#   CERTBOT_EMAIL=you@example.com bash scripts/setup-vps.sh
#
# After this, GitHub Actions handles every deploy (rsync + nginx reload).
#
# IMPORTANT: the kangaroopro.com and www.kangaroopro.com DNS A records must
# already point at this server BEFORE running this — Let's Encrypt validates
# the domain over HTTP, and issuance fails if DNS isn't live yet.

set -euo pipefail

SITE_NAME="kangaroo"
WEB_ROOT="/var/www/kangaroo"
PRIMARY_DOMAIN="kangaroopro.com"
DOMAINS=("kangaroopro.com" "www.kangaroopro.com")
CERTBOT_EMAIL="${CERTBOT_EMAIL:-kangaroo.tech1@gmail.com}"

# Resolve repo root so the script works regardless of where it's invoked from.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
NGINX_CONF_SRC="${REPO_ROOT}/nginx.conf"

if [[ "${EUID}" -ne 0 ]]; then
  echo "This script must be run as root." >&2
  exit 1
fi

if [[ ! -f "${NGINX_CONF_SRC}" ]]; then
  echo "Could not find nginx.conf at ${NGINX_CONF_SRC}" >&2
  exit 1
fi

echo "==> Installing Nginx + Certbot"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y nginx certbot python3-certbot-nginx

echo "==> Creating web root: ${WEB_ROOT}"
mkdir -p "${WEB_ROOT}/.well-known/acme-challenge"
chown -R www-data:www-data "${WEB_ROOT}"

# Drop the stock default site so it can't shadow our server block.
if [[ -e /etc/nginx/sites-enabled/default ]]; then
  echo "==> Removing default Nginx site"
  rm -f /etc/nginx/sites-enabled/default
fi

# The real nginx.conf references certs that don't exist yet, so it can't load
# until issuance succeeds. Stand up a temporary HTTP-only config first, purely
# to answer the ACME challenge on port 80.
echo "==> Installing temporary HTTP bootstrap config (for cert issuance)"
cat > "/etc/nginx/sites-available/${SITE_NAME}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAINS[*]};
    root ${WEB_ROOT};

    location /.well-known/acme-challenge/ {
        root ${WEB_ROOT};
    }

    location / {
        return 200 'kangaroo: awaiting TLS provisioning';
        add_header Content-Type text/plain;
    }
}
EOF
ln -sf "/etc/nginx/sites-available/${SITE_NAME}" "/etc/nginx/sites-enabled/${SITE_NAME}"
nginx -t
systemctl enable nginx
systemctl reload nginx

echo "==> Obtaining Let's Encrypt certificate"
# -d flags expand from the DOMAINS array. The cert's live dir is named after
# the FIRST domain (${PRIMARY_DOMAIN}), which is what nginx.conf points at.
certbot_domain_args=()
for d in "${DOMAINS[@]}"; do
  certbot_domain_args+=(-d "${d}")
done
certbot certonly \
  --webroot -w "${WEB_ROOT}" \
  "${certbot_domain_args[@]}" \
  --email "${CERTBOT_EMAIL}" \
  --agree-tos --no-eff-email --non-interactive \
  --deploy-hook "systemctl reload nginx"

# certonly with --webroot does not deploy these helper files, but the real
# nginx.conf includes them. Pull them from the certbot package data if missing.
if [[ ! -f /etc/letsencrypt/options-ssl-nginx.conf ]]; then
  echo "==> Installing options-ssl-nginx.conf"
  cp /usr/lib/python3/dist-packages/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
     /etc/letsencrypt/options-ssl-nginx.conf
fi
if [[ ! -f /etc/letsencrypt/ssl-dhparams.pem ]]; then
  echo "==> Generating ssl-dhparams.pem"
  openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
fi

echo "==> Installing real HTTPS site config"
cp "${NGINX_CONF_SRC}" "/etc/nginx/sites-available/${SITE_NAME}"
nginx -t
systemctl reload nginx

# certbot installs a systemd timer for auto-renewal automatically; the
# --deploy-hook above ensures nginx reloads after each successful renewal.
echo "==> Verifying auto-renewal timer"
systemctl enable certbot.timer >/dev/null 2>&1 || true
systemctl start certbot.timer >/dev/null 2>&1 || true

echo ""
echo "Done. https://${PRIMARY_DOMAIN} is live and HTTP redirects to HTTPS."
echo "Certificates auto-renew via the certbot systemd timer (reloads nginx on renewal)."
echo "Next: push to main and GitHub Actions will rsync the built site into ${WEB_ROOT}."
