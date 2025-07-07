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

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('id')
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-date')
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)