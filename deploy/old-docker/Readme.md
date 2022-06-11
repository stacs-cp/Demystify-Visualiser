# Some brief notes about Docker deployment

Note:
* docker-machine was deprecated in 2019
* VirtualBox setups also seem to be deprecated
* the only supported setup seems to be via Docker Desktop
* there is no need to do 'brew install docker' or similar
* instead of docker-compose, Docker now seems to prefer 'docker compose'

For a Mac:
* [install Docker Desktop](https://docs.docker.com/desktop/mac/install/) (choose Intel or ARM)
This makes symlinks in `/usr/local/bin` for docker and associated tools.
Ensure that this location is in the shell `PATH`.

Fetch the base Linux image from Docker hub which Demystify wants:
*  `docker image pull haskell:9`
This is 2.1GB and the Demystify docker image uses this as its foundation.

Make sure the "Engine Running" indicator is active in Docker Desktop.
*  `cd Demystify-Visualiser/deploy`
*  `docker compose build`
This takes quite some time to fetch and build a bunch of stuff.
Most of the time is spent installing Haskell and Python prerequisites.

If building Conjure fails with an out-of-memory error:
* in Docker Desktop Settings increase the memory for the virtual machine,
* on my machine with 32GB RAM I increased the default 7.8GB to 14GB.

Once the container has been built successfully:
* `docker container create --name demystify-container demystify-image`

