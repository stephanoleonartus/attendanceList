from rest_framework import viewsets
from .models import Shift
from .serializers import ShiftSerializer
from rest_framework.permissions import IsAdminUser

class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [IsAdminUser]
