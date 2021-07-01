set -euxo pipefail
if [ -d build/ ]; then rm -r build/; fi
cross-env NODE_ENV=production webpack --mode production
cd build/
tar -czvf ../front.tar.gz *
cd ..
