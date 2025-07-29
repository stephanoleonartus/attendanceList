from django.urls import path
from .views import IndividualAttendanceReport, DepartmentAttendanceReport

urlpatterns = [
    path('individual/<int:user_id>/<str:start_date>/<str:end_date>/<str:format>/', IndividualAttendanceReport.as_view(), name='individual_attendance_report'),
    path('department/<int:department_id>/<str:start_date>/<str:end_date>/<str:format>/', DepartmentAttendanceReport.as_view(), name='department_attendance_report'),
]
