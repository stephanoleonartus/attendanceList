from rest_framework import serializers
from .models import Department, Designation, Employee
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Employee
        fields = '__all__'
