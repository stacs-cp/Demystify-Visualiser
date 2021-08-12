from flask import request, Blueprint, jsonify, abort
from rq.job import Job
from demystify.explain import Explainer
import app
from worker import conn
import traceback
import os
import logging
from rq import get_current_job

bp = Blueprint("routes", __name__)


def run_demystify(
    eprime_name,
    eprime,
    param_name,
    param,
    num_steps,
    algorithm,
    explained,
    get_initial,
    choice,
    lit_choice,
    append_current,
):
    """
    This is the main "work" function that gets queued by RQ. It runs
    demystify, with all of the specified options.
    """
    job = get_current_job()
    job.meta["progress"] = "Starting demystify"
    job.save_meta()

    # Try to use eprime files saved in ./eprime if none is provided.
    if eprime is None or param is None:
        eprime_dir = "./eprime/"
        param_dir = "./eprime/" + eprime_name[:-7] + "/"
    else:
        eprime_dir = "./eprime_tmp/"
        param_dir = "./eprime_tmp/"

    explainer = Explainer(algorithm, debug=True)

    # Capture demystify logging output to send back to frontend.
    logger = logging.getLogger("")
    fh = logging.FileHandler("demystify" + job.id + ".log")
    fh.setLevel(logging.DEBUG)
    logger.addHandler(fh)

    eprime_path = eprime_dir + eprime_name
    param_path = param_dir + param_name

    if eprime is not None:
        eprime_file = open(eprime_path, "w")
        eprime_file.write(eprime)
        eprime_file.close()

    if param is not None:
        param_file = open(param_path, "w")
        param_file.write(param)
        param_file.close()

    try:
        job.meta["progress"] = "Initialising from essence prime"
        job.save_meta()

        # Initialise
        explainer.init_from_essence(eprime_path, param_path)

        # Create a map of solution literals so we can add already explained
        # lits.
        sol = explainer.solution
        solmap = {}
        for s in sol:
            solmap[str(s)] = s
        explainer._add_known([solmap[e] for e in explained])

        job.meta["progress"] = "Initialisation complete!"
        job.save_meta()

    except Exception as e:
        return traceback.format_exc() + str(e)


    try:
        if get_initial:
            # get_initial: Just send the current state with no explanations.
            job.meta["progress"] = "Getting initial state"
            job.save_meta()
            result = explainer.get_current_state()
        elif num_steps == 0:
            # num_steps == 0: Just send the choices for the current state 
            # without adding anything to the solver.
            job.meta["progress"] = "Computing MUSes"
            job.save_meta()

            # TODO make demystify return something that lets this be less messy
            result = {"steps": []}
            output = explainer.get_choices()
            choices = output["steps"][0] if len(output["steps"]) > 0 else []
            result["name"] = output["name"]
            result["params"] = output["params"]
            result["steps"].append({"choices": choices})
            
            # Continue to solve steps until we hit a non-trivial step.
            while len(choices) == 0 and len(explainer.unexplained) > 0:
                result["steps"] = result["steps"][:-1]
                result["steps"].append(
                    explainer.explain_steps(num_steps=1)["steps"][0]
                )
                if len(explainer.unexplained) > 0:
                    output = explainer.get_choices()
                    choices = (
                        output["steps"][0] if len(output["steps"]) > 0 else []
                    )
                    result["name"] = output["name"]
                    result["params"] = output["params"]
                    result["steps"].append({"choices": choices})

        elif num_steps < 0:
            # num_steps < 0: Solve the whole puzzle with all explanations
            job.meta["progress"] = "Computing MUSes"
            job.save_meta()
            result = explainer.explain_steps()
        elif lit_choice is not None:
            # lit_choice is not None: Solve the specified number of steps, 
            # applying the lit_choice.
            job.meta["progress"] = "Computing MUSes"
            job.save_meta()
            result = explainer.explain_steps(
                num_steps=num_steps, lit_choice=lit_choice
            )
        else:
            # otherwise: Solve the specified number of steps, 
            # applying any mus_choice.
            job.meta["progress"] = "Computing MUSes"
            job.save_meta()
            result = explainer.explain_steps(
                num_steps=num_steps, mus_choice=choice
            )
            output = explainer.get_choices()
            choices = output["steps"][0] if len(output["steps"]) > 0 else []
            result["name"] = output["name"]
            result["params"] = output["params"]
            result["steps"].append({"choices": choices})
            
            # Continue to solve steps until we hit a non-trivial step.
            while len(choices) == 0 and len(explainer.unexplained) > 0:
                result["steps"] = result["steps"][:-1]
                result["steps"].append(
                    explainer.explain_steps(num_steps=1)["steps"][0]
                )

                if len(explainer.unexplained) > 0:
                    output = explainer.get_choices()
                    choices = (
                        output["steps"][0] if len(output["steps"]) > 0 else []
                    )
                    result["name"] = output["name"]
                    result["params"] = output["params"]
                    result["steps"].append({"choices": choices})

        # Append a state with no explanations to the end if desired.
        if append_current:
            # Remove redundant choices if necessary
            if "choices" in result["steps"][-1]:
                result["steps"] = result["steps"][:-1]
            current_state = explainer.get_current_state()
            result["steps"].append(current_state["steps"][0])

        # If we created eprime files in the process, remove them.
        if eprime is not None and param is not None:
            os.remove(eprime_path)
            os.remove(param_path)

        return {
            "result": result,
            "eprimeName": eprime_name,
            "paramName": param_name,
            "eprime": eprime,
            "param": param,
            "algorithm": algorithm,
            "explainedLits": [str(l) for l in explainer.explained],
            "stepsExplained": explainer.steps_explained,
            "finished": len(explainer.unexplained) <= 0,
        }

    except Exception as e:
        return traceback.format_exc() + str(e)


@bp.route("/")
def index():
    return "Demystify API is running."


@bp.route("/job", methods=["POST"])
def create_job():
    json = request.get_json(force=True)

    job = app.q.enqueue_call(
        func=run_demystify,
        args=(
            json.get("eprimeName"),
            json.get("eprime", None),
            json.get("paramName"),
            json.get("param"),
            json.get("numSteps", -1),
            json.get("algorithm", "cascade"),
            json.get("explainedLits", []),
            json.get("getInitial", False),
            json.get("choice", 0),
            json.get("litChoice", None),
            json.get("appendCurrent", None),
        ),
        result_ttl=5000,
    )
    return jsonify(
        {
            "jobId": job.get_id(),
        }
    )


@bp.route("/job/<string:job_id>", methods=["GET"])
def get_job(job_id):
    job = Job.fetch(job_id, connection=conn)

    if job.is_finished:
        os.remove("demystify" + job.id + ".log")
        return jsonify(
            {
                "jobId": job_id,
                "status": job.get_status(),
            }
        )
    else:
        if os.path.exists("./demystify" + job.id + ".log"):
            log = open("demystify" + job.id + ".log", "r+")
            data = log.read()
            lines = data.splitlines()
            log.close()
        else:
            lines = ""
        return jsonify(
            {
                "jobId": job_id,
                "status": job.get_status(),
                "log": lines,
                "progress": job.meta["progress"],
            }
        )
        


@bp.route("/job/<string:job_id>/output", methods=["GET"])
def get_job_output(job_id):
    job = Job.fetch(job_id, connection=conn)

    if job.is_finished:
        
        if type(job.result) is dict:
            return jsonify(job.result)
        else:
            return jsonify(job.result), 400
    else:
        abort(404, description="Job ID Not Found")


@bp.route("/eprime")
def get_all_examples():
    dir_contents = os.listdir("./eprime")
    eprime_dirs = list(filter(lambda s: s[-7:] != ".eprime", dir_contents))
    eprime_names = []

    for dir in eprime_dirs:
        param_files = list(os.listdir("./eprime/" + dir))
        param_files = list(filter(lambda p: p[-6:] == ".param", param_files))
        to_append = list(map(lambda s: dir + ".eprime, " + s, param_files))
        eprime_names.extend(to_append)

    return jsonify(eprime_names)


@bp.route("/examples/<string:eprime_name>")
def get_examples(eprime_name):
    pass
