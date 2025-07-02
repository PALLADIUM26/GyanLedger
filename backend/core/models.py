from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    student_class = models.CharField(max_length=20)
    phone = models.CharField(max_length=15)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.student_class})"


class Payment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"₹{self.amount} by {self.student.name} on {self.date}"
