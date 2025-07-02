from rest_framework import serializers
from .models import Student, Payment

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'  # Includes all model fields

class PaymentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
