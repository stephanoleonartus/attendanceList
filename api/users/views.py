from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Department, Designation, Employee
from .serializers import DepartmentSerializer, DesignationSerializer, EmployeeSerializer
from authentication.serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from authentication.permissions import IsAdmin, IsHR, IsAdminOrHR

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def handle_exception(self, exc):
        if hasattr(exc, 'status_code') and exc.status_code == 404:
            return Response(
                {'error': 'Department not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        return super().handle_exception(exc)

class UserCreateView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrHR]

class DesignationViewSet(viewsets.ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def handle_exception(self, exc):
        if hasattr(exc, 'status_code') and exc.status_code == 404:
            return Response(
                {'error': 'Designation not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        return super().handle_exception(exc)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrHR]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'employee') and user.employee.role == 'Admin':
            return Employee.objects.all()
        elif hasattr(user, 'employee') and user.employee.role == 'HR':
            return Employee.objects.all()
        else:
            return Employee.objects.filter(user=user)

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user's employee profile"""
        try:
            employee = request.user.employee
            serializer = self.get_serializer(employee)
            return Response(serializer.data)
        except Employee.DoesNotExist:
            return Response(
                {'error': 'Employee profile not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

    def handle_exception(self, exc):
        if hasattr(exc, 'status_code') and exc.status_code == 404:
            return Response(
                {'error': 'Employee not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        return super().handle_exception(exc)