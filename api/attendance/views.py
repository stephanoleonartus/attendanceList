from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Attendance
from .serializers import AttendanceSerializer
from datetime import date, datetime
from location.models import Location
from location.utils import calculate_distance
from rest_framework.permissions import IsAuthenticated

class CheckInView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        today = date.today()
        user = request.user
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        photo = request.data.get('photo')

        if not latitude or not longitude:
            return Response({'error': 'Latitude and longitude are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not photo:
            return Response({'error': 'Photo is required for check-in.'}, status=status.HTTP_400_BAD_REQUEST)

        office_location = Location.objects.first()
        if not office_location:
            return Response({'error': 'Office location is not set.'}, status=status.HTTP_400_BAD_REQUEST)

        distance = calculate_distance(float(latitude), float(longitude), office_location.latitude, office_location.longitude)

        if distance > office_location.radius:
            return Response({'error': f'You are {distance} meters away from the office.'}, status=status.HTTP_400_BAD_REQUEST)

        attendance, created = Attendance.objects.get_or_create(user=user, date=today)

        if attendance.check_in:
            return Response({'error': 'You have already checked in today.'}, status=status.HTTP_400_BAD_REQUEST)

        attendance.check_in = datetime.now().time()
        attendance.status = 'Present'
        attendance.latitude = latitude
        attendance.longitude = longitude
        attendance.check_in_photo = photo
        attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(serializer.data)

class AttendanceHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        attendance = Attendance.objects.filter(user=user)
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)

class CheckOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        today = date.today()
        user = request.user
        photo = request.data.get('photo')

        if not photo:
            return Response({'error': 'Photo is required for check-out.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            attendance = Attendance.objects.get(user=user, date=today)
        except Attendance.DoesNotExist:
            return Response({'error': 'You have not checked in today.'}, status=status.HTTP_400_BAD_REQUEST)

        if attendance.check_out:
            return Response({'error': 'You have already checked out today.'}, status=status.HTTP_400_BAD_REQUEST)

        attendance.check_out = datetime.now().time()
        attendance.check_out_photo = photo
        attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(serializer.data)
