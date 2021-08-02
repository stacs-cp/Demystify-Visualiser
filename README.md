# Demystify-Visualiser

This is a react-based tool that provides a visualisation of the human understandable solutions to "pen and paper" puzzles produced by the [Demystify](https://github.com/stacs-cp/demystify) solver. Originally written by [Matthew McIlree](https://github.com/mmcilree) as part of an Undergraduate Research Assistant Scheme project 2021. 

## How to Run (Development)

1. Ensure you have [Node >= 10.16 and npm >= 5.6](https://nodejs.org/en/) installed.

2. Ensure you have [python3/pip3](https://realpython.com/installing-python/) installed

3. Clone the repository.

4. Navigate to the `demystify-visualiser/server` folder. 

5. Run:
	```bash
   python3 -m venv venv
   source venv/bin/activate
   pip3 install -r requirements.txt
   ```
	*This creates a python [virtual environment](https://docs.python.org/3/tutorial/venv.html) to avoid installing modules globally. The environment can be exited via `deactivate`*
	
6. Navigate to the `demystify-visualiser/client` folder. 

7. Run `npm install`

8. Run `npm start`

9. Run `npm run backend`

10. The web application will be available at `localhost:3000/demystify` 

## Including Live Features

To make use of the "Run demystify live feature" some extra steps are required:

1. Install conjure as described in the [README](https://github.com/stacs-cp/demystify#readme) for demystify.
2. Install [Redis >= 6.24](https://redis.io/download)
3. Follow the steps as above
4. Additionally run `npm run worker` in the client folder.

## Alternative Using Dockerfile

Alternatively, the installation steps above (including install of conjure) can be replaced with installation in a container using Docker. 

1. Navigate to the `deploy` folder.
2. Run `docker-compose build` (this may take some time to complete)
3. Then, the application can be started via`docker-compose up`.
4. The web application will be available at `localhost:5000/demystify/` (note: the trailing slash is important here)

## Basic Usage

There are currently four functionalities available for this visualiser. 

### Visualise Demystify JSON output:

The visualiser can take as input JSON input file produced by running Demystify with the ``--json`` option (the value of the option is the name of the json file to be produced) e.g.

```bash
python3 demystify --eprime ./eprime/nfutoshiki.eprime --eprimeparam ./eprime/futoshiki/nfutoshiki-1.param --json futoshiki
```

The *.eprime* files are written in the [essence prime]() constraint modelling language, and specify the puzzle rules. A specific puzzle instance is described in a *.param* file. Once computed, the output can then be selected and viewed. 

### Preloaded examples:

Alternatively preloaded examples are available for demonstration purposes. Demystify JSON output is loaded in from the server side.

### Sudoku Builder:

For the "normal" Sudoku puzzle only there is an option to build a custom puzzle instance and either download it as a *.param* file or pass it to a live demystifty run.

### Run Demystify Live:

Demystify is installed as a pip package as part of the flask server and so can be run on the server without the need for a local installation. Essence input files can be uploaded or selected and various options can be specified:

- **Default mode:** Demystify will make all explanation/solving steps itself and present the solved puzzle / explanation to the user.
- **Choose MUSes manually:** When there are multiple options for a particular MUS choice (explanation constraints) the user can choose which is to be used for the next step.
- **Force literal choice:** At each step, the user can force the solver to consider a particular literal (solved puzzle value).
- **Cascade Algorithm (Faster):** The MUS finding algorithm descibed in [this paper](http://ceur-ws.org/Vol-2894/short8.pdf)  
- **Cascade Algorithm (More MUSes):** Tweaked version of the above algorithm to focus on finding more options for non-trivial explanation steps. This runs more slowly.
- **FORQES Algorithm:** An experimental MUS finder using an adapated version of the FORQES algorithm described in [this paper](https://alexeyignatiev.github.io/assets/pdf/iplms-cp15-preprint.pdf)

## Development Documentation

Some further notes on the visualiser implementation and a [guide for possible extension](./doc/Styling_Puzzles.md) are available in the doc folder.

## Deploying to a server

One way of deploying (using Flask) is demonstrated via the `nginx.conf` file and the `boot.sh` deployment script. 

