from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
