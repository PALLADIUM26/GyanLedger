from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, PaymentViewSet, register_user
from .views import dashboard_summary, due_payments, monthly_summary

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('summary/', dashboard_summary, name='dashboard-summary'),
    path('dues/', due_payments),
    path('monthly-summary/', monthly_summary),
]
