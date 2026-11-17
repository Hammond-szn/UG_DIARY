class CGPACalculator:
    def __init__(self, level100, level200, level300, level400):
        self.level100 = level100
        self.level200 = level200
        self.level300 = level300
        self.level400 = level400

    def calculate_cgpa(self):
        return (
            self.level100
            + self.level200
            + self.level300 * 2
            + self.level400 * 2
        ) / 6

    def get_classification(self):
        cgpa = self.calculate_cgpa()

        if cgpa >= 3.6:
            return"first class"
        elif cgpa >= 3.0:
            return"Second class upper"
        elif cgpa >= 2.0:
            return"Second class lower"
        elif cgpa >= 1.5:
            return"Third class"
        else:
            return"Pass"

level100 = float(input("enter level 100 grade: "))
level200 = float(input("enter level 200 grade: "))
level300 = float(input("enter level 300 grade: "))
level400 = float(input("enter level 400 grade: "))

calculator = CGPACalculator(level100, level200, level300, level400)

cgpa = calculator.calculate_cgpa()
classification = calculator.get_classification()

print(f"Your cgpa is: {cgpa:.2f}")
print(f"Youre in:{classification}")