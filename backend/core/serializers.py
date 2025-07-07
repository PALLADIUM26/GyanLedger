from rest_framework import serializers
from .models import Student, Payment
from django.contrib.auth.models import User

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'  # Includes all model fields

class PaymentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user