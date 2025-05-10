#diy_hub/urls.py
"""
from django.urls import path, include
from django.contrib import admin
from django.http import JsonResponse, HttpResponseRedirect
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static



def homepage(request):
    return HttpResponseRedirect('/api/')  # Redirect root to /api/

def api_root(request):
    return JsonResponse({
        "users": "/api/users/",
        "projects": "/api/projects/",
        "ratings": "/api/ratings/",
    })

urlpatterns = [
    path('', homepage),  # Root URL redirects to /api/
    path('admin/', admin.site.urls),
    path('api/', api_root),  # <-- This line handles the /api/ path
    path('api/users/', include('users.urls')),
    #path('api/projects/', include('projects.urls')),
    path('api/ratings/', include('ratings.urls')),
    path('api/auth/', include('authentication.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('projects.urls')),



]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

"""

from django.urls import path, include
from django.contrib import admin
from django.http import JsonResponse, HttpResponseRedirect
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

def homepage(request):
    return HttpResponseRedirect('/api/')

def api_root(request):
    return JsonResponse({
        "users": "/api/users/",
        "projects": "/api/projects/",
      #  "ratings": "/api/ratings/",
    })

urlpatterns = [
    path('', homepage),
    path('admin/', admin.site.urls),
    path('api/', api_root),  # Base API info
    path('api/users/', include('users.urls')),
    path('api/projects/', include('projects.urls')),  # ✅ Fixed this
    #path('api/ratings/', include('ratings.urls')),
    path('api/auth/', include('authentication.urls')),
    path('api/', include('projects.urls')),
    path('api/', include('users.urls')),

    # JWT endpoints (optional if already in users.urls)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# Media file serving in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
