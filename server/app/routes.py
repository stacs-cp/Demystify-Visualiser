from flask import request, Blueprint, jsonify, abort
from rq.job import Job
from demystify.explain import Explainer  
import app
from worker import conn

bp = Blueprint('routes', __name__)

def run_demystify(eprime_name, eprime, param_name, param, num_steps, algorithm):
    explainer = Explainer(algorithm)
    eprime_path = "./eprime/" + eprime_name
    param_path = "./eprime/" + param_name
    eprime_file = open(eprime_path, "w")
    eprime_file.write(eprime)
    eprime_file.close()

    param_file = open(param_path, "w")
    param_file.write(param)
    param_file.close()

    if num_steps < 1:
        num_steps=None

    try:
        explainer.init_from_essence(eprime_path, param_path)
    except Exception as e:
        return str(e)

    try:
        result = explainer.explain_steps(num_steps=num_steps)
        return {"result": result, 
                "eprimeName": eprime_name, 
                "paramName": param_name,
                "eprime": eprime,
                "param": param, 
                "algorithm": algorithm,
                "explainedLits": [str(l) for l in explainer.explained],
                "stepsExplained": explainer.steps_explained}
    
    except Exception as e:
        return str(e)


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
                json.get("eprime"),
                json.get("paramName"),
                json.get("param"),
                json.get("numSteps", -1),
                json.get("algorithm", "cascade")
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

@bp.route('/job/<string:job_id>', methods=['POST'])
def continue_job(job_id):    
    return f'continue_job({job_id})'

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