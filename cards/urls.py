from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, register

router = DefaultRouter()
router.register('profiles', ProfileViewSet)

urlpatterns = [
    path('register/', register),
    path('', include(router.urls)),
]