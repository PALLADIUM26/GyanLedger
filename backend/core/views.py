from rest_framework import viewsets
from .models import Student, Payment
from .serializers import StudentSerializer, PaymentSerializer
from rest_framework.permissions import IsAuthenticated

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('id')
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-date')
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
