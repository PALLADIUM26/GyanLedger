from rest_framework import viewsets
from .models import Student, Payment
from .serializers import StudentSerializer, PaymentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from datetime import date

class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Student.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):
    user = request.user
    total_students = Student.objects.filter(user=user).count()
    
    this_month = date.today().month
    this_year = date.today().year

    monthly_payments = Payment.objects.filter(
        user=user,
        date__month=this_month,
        date__year=this_year
    )
    
    total_payments = monthly_payments.count()
    total_amount = sum(p.amount for p in monthly_payments)

    # Find students who have NOT paid this month
    paid_student_ids = monthly_payments.values_list('student_id', flat=True)
    unpaid_students = Student.objects.filter(user=user).exclude(id__in=paid_student_ids).count()

    return Response({
        'total_students': total_students,
        'total_payments': total_payments,
        'total_amount': total_amount,
        'unpaid_students': unpaid_students
    })