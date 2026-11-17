first_grade=input("Enter level100 grade:")

first_grade= float(first_grade)
second_grade=input("Enter level200 grade:")
second_grade=float(second_grade)
third_grade=input("Enter level300 grade:")
third_grade=float(third_grade)
fourth_grade=input("Enter level400 grade:")
fourth_grade=float(fourth_grade)
final_grade=  (first_grade + second_grade + third_grade*2 + fourth_grade*2)/ 6
if final_grade >= 3.6:
    print("Your CGPA IS:", final_grade, "You are in first class")
elif final_grade >= 3.0:
    print("Your CGPA IS:", final_grade, "You are in second class upper")
elif final_grade >= 2.0: 
    print("Your CGPA IS:", final_grade, "You are in second class lower")
elif final_grade >= 1.5:
    print("Your CGPA IS:", final_grade, "You are in third class")
else:
    print("Your CGPA IS:", final_grade, "Pass")