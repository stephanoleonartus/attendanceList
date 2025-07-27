from rest_framework import serializers
from .models import AttendancePolicy, Notification

class AttendancePolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendancePolicy
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
