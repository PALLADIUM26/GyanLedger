from rest_framework import viewsets
from .models import Student, Payment
from .serializers import StudentSerializer, PaymentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('id')
    serializer_class = StudentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-date')
    serializer_class = PaymentSerializer
