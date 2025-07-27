from rest_framework import viewsets, views
from .models import AttendancePolicy, Notification
from .serializers import AttendancePolicySerializer, NotificationSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from attendance.models import Attendance
from datetime import date

class AttendancePolicyViewSet(viewsets.ModelViewSet):
    queryset = AttendancePolicy.objects.all()
    serializer_class = AttendancePolicySerializer
    permission_classes = [IsAdminUser]

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

class BulkAttendanceView(views.APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        user_ids = request.data.get('user_ids', [])
        status = request.data.get('status')
        today = date.today()

        for user_id in user_ids:
            try:
                user = User.objects.get(id=user_id)
                attendance, created = Attendance.objects.get_or_create(user=user, date=today)
                attendance.status = status
                attendance.save()
            except User.DoesNotExist:
                continue

        return Response({'message': 'Bulk attendance updated successfully.'})
