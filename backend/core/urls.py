from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, PaymentViewSet, register_user


router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
]
