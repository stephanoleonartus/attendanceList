from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from attendance.models import Attendance
from attendance.serializers import AttendanceSerializer

class ReportView(APIView):
    def get(self, request):
        report_type = request.query_params.get('type', 'daily')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        if report_type == 'daily':
            attendance = Attendance.objects.filter(date=start_date)
        elif report_type == 'custom' and start_date and end_date:
            attendance = Attendance.objects.filter(date__range=[start_date, end_date])
        else:
            attendance = Attendance.objects.all()

        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
