from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Attendance
from .serializers import AttendanceSerializer
from datetime import date

class TodayAttendanceView(APIView):
    def get(self, request):
        today = date.today()
        attendance = Attendance.objects.filter(date=today)
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
