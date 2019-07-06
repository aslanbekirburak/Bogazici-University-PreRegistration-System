import requests


f = open("result.txt", "r")

ff = f.readlines()[0]
result = eval(ff)
#print(f"result: {result}")
rr = list()
for r in result:
    rr.append({"id": r["id"], "course": r["course"]})
# print(rr)

url = "http://127.0.0.1:8000/course/saveCourses"
rs = requests.post(url, json={'result': result})

print("Solutions saved to database")

# file_ =open("allCourses.txt", "w")
# file_.writelines(str(response))
# print(type(response))
