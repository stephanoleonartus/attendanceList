from rest_framework import viewsets
from .models import Department, Designation, Employee
from .serializers import DepartmentSerializer, DesignationSerializer, EmployeeSerializer
from rest_framework.permissions import IsAdminUser

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminUser]

class DesignationViewSet(viewsets.ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    permission_classes = [IsAdminUser]

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAdminUser]
