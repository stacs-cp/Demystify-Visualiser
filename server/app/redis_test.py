import json
from demystify import explain

exp = explain.Explainer("cascade")
exp.init_from_essence("./eprime/binairo.eprime", "./eprime/binairo-1.param")
res = exp.explain_steps(num_steps=1)

saved_lits = [str(l) for l in exp.explained]
"""
for lit in exp.unexplained:
    l = {}
    l["val"] = lit.val
    l["equal"] = lit.equal
    l["varname"] = lit.var._name
    l["vardom"] = lit.var._dom
    l["varlocation"] = lit.var._location
    saved_lits.append(l)
"""
file = open("./temp_store.json", "w")
file.write(json.dumps(saved_lits))
file.close()

out = open("./output1.json", "w")
out.write(json.dumps(res))
out.close()

    