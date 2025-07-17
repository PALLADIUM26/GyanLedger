from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
import os

class Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    student_class = models.CharField(max_length=20)
    phone = models.CharField(max_length=15)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    monthly_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.name} ({self.student_class})"


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"₹{self.amount} by {self.student.name} on {self.date}"


def user_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{instance.user.username}_{now().strftime('%Y%m%d%H%M%S')}.{ext}"
    return os.path.join('profile_pics', filename)


# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to=user_directory_path, blank=True, null=True)

#     def __str__(self):
#         return self.user.username
    
