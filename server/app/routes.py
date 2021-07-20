from flask import request, Blueprint, jsonify, abort
from rq.job import Job
from demystify.explain import Explainer  
import app
from worker import conn
import traceback

bp = Blueprint('routes', __name__)

def run_demystify(eprime_name, eprime, param_name, param, num_steps, algorithm, explained, appendChoices, choice):
    explainer = Explainer(algorithm)
    eprime_path = "./eprime/" + eprime_name
    param_path = "./eprime/" + param_name

    if eprime is not None:
        eprime_file = open(eprime_path, "w")
        eprime_file.write(eprime)
        eprime_file.close()

    param_file = open(param_path, "w")
    param_file.write(param)
    param_file.close()

    try:
        explainer.init_from_essence(eprime_path, param_path)
        sol = explainer.solution
        solmap = {}
        for s in sol:
            solmap[str(s)] = s

        explainer._add_known([solmap[e] for e in explained])

    except Exception as e:
        return traceback.format_exc() + str(e)

    try:
        if num_steps == 0:
            # TODO make demystify return something that lets this be less messy
            result = {"steps": []}
            output = explainer.get_choices()
            choices = output["steps"][0] if len(output["steps"])> 0 else []
            result["name"] = output["name"]
            result["params"] = output["params"]
            result["steps"].append({"choices": choices})
            while len(choices) == 0 and len(explainer.unexplained) > 0:
                result["steps"] = result["steps"][:-1]
                result["steps"].append(explainer.explain_steps(num_steps=1)["steps"][0])
                if len(explainer.unexplained) > 0:
                    output = explainer.get_choices()
                    choices = output["steps"][0] if len(output["steps"]) > 0 else []
                    result["name"] = output["name"]
                    result["params"] = output["params"]
                    result["steps"].append({"choices": choices})

        elif num_steps < 0:    
            result = explainer.explain_steps()
        else:
            result = explainer.explain_steps(num_steps=num_steps, mus_choice=choice)
            output = explainer.get_choices()
            choices = output["steps"][0] if len(output["steps"]) > 0 else []
            result["name"] = output["name"]
            result["params"] = output["params"]
            result["steps"].append({"choices": choices})
            while len(choices) == 0 and len(explainer.unexplained) > 0:
                result["steps"] = result["steps"][:-1]
                result["steps"].append(explainer.explain_steps(num_steps=1)["steps"][0])
                if len(explainer.unexplained) > 0:
                    output = explainer.get_choices()
                    choices = output["steps"][0] if len(output["steps"]) > 0 else []
                    result["name"] = output["name"]
                    result["params"] = output["params"]
                    result["steps"].append({"choices": choices})
            
        
        


        return {"result": result, 
                "eprimename": eprime_name, 
                "paramname": param_name,
                "eprime": eprime,
                "param": param, 
                "algorithm": algorithm,
                "explainedLits": [str(l) for l in explainer.explained],
                "stepsExplained": explainer.steps_explained,
                "finished": len(explainer.unexplained) <= 0}
    
    except Exception as e:
        return traceback.format_exc() +  str(e)


@bp.route("/")                   
def index():                      
    return "Demystify API is running."

@bp.route('/job', methods=['POST'])
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
                json.get("appendChoices", False),
                json.get("choice", 0)
                ), result_ttl=5000
        )
    return jsonify({
                "jobId": job.get_id(),
                })

@bp.route('/job/<string:job_id>', methods=['GET'])
def get_job(job_id):    
    job = Job.fetch(job_id, connection=conn)

    if job.is_finished:
        return jsonify({
                "jobId": job_id,
                "status": job.get_status(),
                })
    else:
        return jsonify({
                "jobId": job_id,
                "status": job.get_status(),
                })


@bp.route('/job/<string:job_id>/output', methods=['GET'])
def get_job_output(job_id):
    job = Job.fetch(job_id, connection=conn)
    
    if job.is_finished:
        if type(job.result) is dict:
            return jsonify(job.result)
        else:
            return jsonify(job.result), 400
    else:
        abort(404, description="Job ID Not Found")