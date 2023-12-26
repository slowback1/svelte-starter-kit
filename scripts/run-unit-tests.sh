cd $(git rev-parse --show-toplevel) || exit 1

TAG=frontend-tests-runner:latest
docker image remove ${TAG} || true

docker build -t=${TAG} -f docker/Dockerfile --target=test .

rm -rf ./testOutput || true
mkdir testOutput

docker run -v ./testOutput:/app/testOutput ${TAG}
