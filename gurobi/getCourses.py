import requests

url = "http://127.0.0.1:8000/course/solver"
r = requests.get(url)
print("Courses taken")
response = r.json()

file_ =open("allCourses.txt", "w")
file_.writelines(str(response))
print("Courses written to allCourses.txt")


