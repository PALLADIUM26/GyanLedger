from rest_framework import viewsets
from .models import Student, Payment, Profile
from .serializers import StudentSerializer, PaymentSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from datetime import date, datetime
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework.parsers import MultiPartParser, FormParser

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def due_payments(request):
    user = request.user
    students = Student.objects.filter(user=user)
    dues = []
    today = now().date()

    for student in students:
        latest_payment = Payment.objects.filter(student=student).order_by('-date').first()
        if not latest_payment or latest_payment.date.month != today.month or latest_payment.date.year != today.year:
            dues.append({
                'student_id': student.id,
                'name': student.name,
                'class': student.student_class,
                'monthly_fee': student.monthly_fee,
                'last_payment': latest_payment.date if latest_payment else None
            })

    return Response(dues)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def monthly_summary(request):
    user = request.user
    month = request.GET.get('month')
    year = request.GET.get('year')

    if not month or not year:
        return Response({'error': 'Month and year are required'}, status=400)

    month = int(month)
    year = int(year)

    students = Student.objects.filter(user=user)
    payments = Payment.objects.filter(user=user, date__month=month, date__year=year)

    expected = sum([s.monthly_fee for s in students])
    collected = sum([p.amount for p in payments])
    pending = expected - collected

    return Response({
        'month': f"{year}-{month:02d}",
        'expected': expected,
        'collected': collected,
        'pending': pending
    })


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user

    profile, created = Profile.objects.get_or_create(user=user)

    if request.method == 'GET':
        return Response({
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'image': request.build_absolute_uri(user.profile.image.url) if user.profile.image else None
            # 'image': request.build_absolute_uri(user.profile.image.url)
        })

    elif request.method == 'PUT':
        data = request.data
        user.email = data.get('email', user.email)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()
        if 'image' in request.FILES:
            profile.image = request.FILES['image']
            profile.save()

        return Response({'message': 'Profile updated successfully!'})
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not user.check_password(old_password):
        return Response({'error': '❌ Incorrect old password'}, status=400)

    user.set_password(new_password)
    user.save()
    return Response({'message': '🔐 Password changed successfully'})


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def update_profile_picture(request):
    profile = request.user.userprofile
    serializer = ProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': '✅ Profile picture updated!'})
    return Response(serializer.errors, status=400)