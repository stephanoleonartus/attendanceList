from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendancePolicyViewSet, NotificationViewSet, BulkAttendanceView

router = DefaultRouter()
router.register(r'policies', AttendancePolicyViewSet)
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
    path('bulk-attendance/', BulkAttendanceView.as_view(), name='bulk_attendance'),
]
