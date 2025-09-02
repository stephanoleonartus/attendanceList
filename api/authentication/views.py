from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Create token for the new user
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'message': 'User created successfully',
            'token': token.key,
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({
                'error': 'Username and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes = []  # Remove authentication requirement temporarily

    def get(self, request):
        # Manual token authentication
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header or not auth_header.startswith('Token '):
            return Response({
                'error': 'Authentication credentials were not provided.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        token_key = auth_header.split(' ')[1]
        
        try:
            from rest_framework.authtoken.models import Token
            token = Token.objects.get(key=token_key)
            user = token.user
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except Token.DoesNotExist:
            return Response({
                'error': 'Invalid token.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({
                'error': 'Authentication failed.'
            }, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            # Get the token from request
            token = request.auth
            if token:
                token.delete()
                return Response({
                    'message': 'Successfully logged out'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'No active session found'
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'error': 'Error logging out'
            }, status=status.HTTP_400_BAD_REQUEST)