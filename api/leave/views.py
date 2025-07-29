from rest_framework import viewsets
from .models import Leave, Holiday
from .serializers import LeaveSerializer, HolidaySerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class LeaveViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.employee.role == 'HR':
            return Leave.objects.all()
        return Leave.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HolidayViewSet(viewsets.ModelViewSet):
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer
    permission_classes = [IsAdminUser]
