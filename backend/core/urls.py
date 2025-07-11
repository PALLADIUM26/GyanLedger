from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, PaymentViewSet, register_user
from .views import dashboard_summary, due_payments, monthly_summary, user_profile, change_password, delete_account

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('summary/', dashboard_summary, name='dashboard-summary'),
    path('dues/', due_payments),
    path('monthly-summary/', monthly_summary),
    path('profile/', user_profile),
    path('change-password/', change_password),
    path('delete-account/', delete_account, name='delete-account'),
]
