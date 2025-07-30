from rest_framework import viewsets
from .models import Location
from .serializers import LocationSerializer
from rest_framework.permissions import IsAdminUser

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAdminUser]
