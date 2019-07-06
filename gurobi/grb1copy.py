import sys
from   gurobipy import *


CourseQuota          = { "cmpe478": 2, "cmpe352": 2, "cmpe362": 4 } 

NumStudentCourses    = { "ali":2, "veli": 3, "aliye":2}

CourseSelections     = {"ali": ["cmpe478","cmpe352"], "veli": ["cmpe478","cmpe352"], 
                        "aliye": ["cmpe362","cmpe352","cmpe478"] } 

try:

    # Create a new model
    model = Model("mip1")
    

    # Create variables
    x = [] 
    c2s = {} 
    i = 0 
    for s in CourseSelections: 
        cl = CourseSelections[s]
        for c in cl: 
           varname = s + c ; 
           x.append(model.addVar(vtype=GRB.BINARY, name=varname))
           if c not in c2s:
             c2s[c] = [ i ]
           else:
             c2s[c].append(i) 
           i = i + 1 

    # Set objective
    obj = LinExpr();
    for v in x:
       obj += v 
    model.setObjective(obj, GRB.MAXIMIZE);
 
    # Add constraints for NumStudentCourses  
    k = 0 
    for s in CourseSelections: 
        cl = CourseSelections[s]  
        cvarlist = [x[i] for i in range(k,k+len(cl)) ] 
        oneconst = [1 for i in range(0,len(cl))]
        constraintexpr = LinExpr(oneconst,cvarlist)
        model.addConstr(constraintexpr  <= NumStudentCourses[s])
        k = k+len(cl) 
 
     # Add constraints for CourseQuota  
    for c in CourseQuota: 
        cl = c2s[c]
        cvarlist = [x[cl[i]] for i in range(0,len(cl)) ] 
        oneconst = [1 for i in range(0,len(cl)) ]
        constraintexpr = LinExpr(oneconst,cvarlist)
        model.addConstr(constraintexpr  <= CourseQuota[c])         
    
    # Optimize model
    model.optimize()

    for v in model.getVars():
        print('%s %g' % (v.varName, v.x))

    print('Obj: %g' % model.objVal)

except GurobiError as e:
    print('Error code ' + str(e.errno) + ": " + str(e))

except AttributeError:
    print('Encountered an attribute error')
