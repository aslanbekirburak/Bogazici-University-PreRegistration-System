import random, string
from pprint import pprint

CourseQuota = dict()

for i in range(10):
    course = ''.join(random.choices(string.ascii_uppercase, k=3)) + ''.join(random.choices(string.digits, k=3))

    quota = random.randint(30, 120)

    CourseQuota[course] = quota

NumStudentCourses = dict()

for i in range(10):
    student = ''.join(random.choices(string.ascii_lowercase, k=6)) + ' ' + ''.join(random.choices(string.ascii_lowercase, k=7))

    quota = random.randint(3, 7)

    NumStudentCourses[student] = quota

CourseSelections = dict()

for i, j in NumStudentCourses.items():
    lectures = list()
    for k in range(j):
        lecturePicked = random.choice(list(CourseQuota.keys()))
        while lecturePicked in lectures:
            lecturePicked = random.choice(list(CourseQuota.keys()))
        lectures.append(lecturePicked)
    
    CourseSelections[i] = lectures

pprint(CourseSelections)
f = open("cs.txt", "w")
f.writelines(str(CourseSelections))
f.close()
print("-------")
pprint(CourseQuota)
f = open("cq.txt", "w")
f.writelines(str(CourseQuota))
f.close()
print("-------")
pprint(NumStudentCourses)
f = open("ns.txt", "w")
f.writelines(str(NumStudentCourses))
f.close()