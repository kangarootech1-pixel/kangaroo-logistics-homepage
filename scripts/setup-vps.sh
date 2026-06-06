#!/usr/bin/env bash
#
# One-time VPS provisioning for the Kangaroo Logistics homepage.
# Run this ONCE on the VPS as root (Ubuntu 24.04):
#
#   ssh root@187.124.170.65
#   git clone <repo> /tmp/kangaroo && cd /tmp/kangaroo
#   bash scripts/setup-vps.sh
#
# Nginx serves the static site on port 8081. Traefik (already running on
# 80/443) terminates TLS and forwards kangaroopro.com traffic to it — the
# Traefik routing rule is added separately on the VPS.
#
# After this, GitHub Actions handles every deploy (rsync + nginx reload).

set -euo pipefail

SITE_NAME="kangaroo"
WEB_ROOT="/var/www/kangaroo"

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

echo "==> Installing Nginx"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y nginx

echo "==> Creating web root: ${WEB_ROOT}"
mkdir -p "${WEB_ROOT}"
chown -R www-data:www-data "${WEB_ROOT}"

echo "==> Installing site config (Nginx on port 8081)"
cp "${NGINX_CONF_SRC}" "/etc/nginx/sites-available/${SITE_NAME}"
ln -sf "/etc/nginx/sites-available/${SITE_NAME}" "/etc/nginx/sites-enabled/${SITE_NAME}"

# Drop the stock default site so it can't shadow our server block.
if [[ -e /etc/nginx/sites-enabled/default ]]; then
  echo "==> Removing default Nginx site"
  rm -f /etc/nginx/sites-enabled/default
fi

echo "==> Testing and reloading Nginx"
nginx -t
systemctl enable nginx
systemctl reload nginx

echo ""
echo "Done. Nginx is serving ${WEB_ROOT} on port 8081."
echo "Next: add the Traefik routing rule for kangaroopro.com -> 127.0.0.1:8081,"
echo "then push to main and GitHub Actions will rsync the built site into ${WEB_ROOT}."
