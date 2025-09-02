from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Department, Employee

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    full_name = serializers.CharField(write_only=True)
    department = serializers.CharField(write_only=True)
    role = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'full_name', 'department', 'role')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        return data

    def create(self, validated_data):
        full_name = validated_data.pop('full_name')
        department_name = validated_data.pop('department')
        role = validated_data.pop('role')
        validated_data.pop('password2')

        # Split full_name into first_name and last_name
        first_name, last_name = (full_name.split(' ', 1) + [None])[:2]

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name if last_name else ''
        )

        if role in ['Admin', 'HR']:
            user.is_staff = True
            user.save()

        # Get or create the department
        department, created = Department.objects.get_or_create(name=department_name)

        # Create the employee profile
        Employee.objects.create(user=user, department=department, role=role)
        
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff')

class LoginResponseSerializer(serializers.Serializer):
    token = serializers.CharField()
    user = UserSerializer()