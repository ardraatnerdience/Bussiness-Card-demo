from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer
import qrcode
from io import BytesIO
from django.core.files import File


# 🔐 Register API
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Check if user already exists
    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"})

    # Create user
    User.objects.create_user(username=username, password=password)

    return Response({"message": "User created successfully"})

# 🔧 Profile ViewSet
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    # ✅ Show only logged-in user's profiles
    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    # ✅ Assign profile to logged-in user + QR generation
    def perform_create(self, serializer):
        profile = serializer.save(user=self.request.user)

        # Generate QR
        qr_data = f"http://localhost:3000/profile/{profile.id}"
        qr = qrcode.make(qr_data)

        buffer = BytesIO()
        qr.save(buffer, format='PNG')

        profile.qr_code.save(f'qr_{profile.id}.png', File(buffer), save=True)