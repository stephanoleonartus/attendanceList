from django.urls import path
from .views import TodayAttendanceView

urlpatterns = [
    path('today/', TodayAttendanceView.as_view(), name='today-attendance'),
]
