from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        return data

    def create(self, validated_data):
        # Remove password2 from validated_data before creating user
        validated_data.pop('password2', None)
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        # Import Employee here to avoid circular import
        try:
            from users.models import Employee
            Employee.objects.create(user=user)
        except ImportError:
            # If Employee model doesn't exist yet, skip this step
            pass
        
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff')

class LoginResponseSerializer(serializers.Serializer):
    token = serializers.CharField()
    user = UserSerializer()