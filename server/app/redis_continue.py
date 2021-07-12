import json
from demystify import explain

file = open("./temp_store.json", "r")
data = file.read()
saved_lits = json.loads(data)


exp = explain.Explainer("cascade")
exp.init_from_essence("./eprime/binairo.eprime", "./eprime/binairo-1.param")

sol = exp.solution
solmap = {}
for s in sol:
    solmap[str(s)] = s

exp._add_known([solmap[s] for s in saved_lits])

res = exp.explain_steps(num_steps=1)

out = open("./output2.json", "w")
out.write(json.dumps(res))
out.close()