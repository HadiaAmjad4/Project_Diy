# projects/urls.py
from django.urls import path
from .views import (
    ProjectListCreateView,
    ProjectRetrieveUpdateDestroyView,
    MyProjectsListView,
    RatingCreateView,
    ProjectRatingListView,
    CommentListCreateView,
    CommentDeleteView,
    CategoryListCreateView,
)

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='project-detail'),
    path('my-projects/', MyProjectsListView.as_view(), name='my-projects'),

    # Ratings
    path('projects/<int:project_id>/rate/', RatingCreateView.as_view(), name='rate-project'),
    path('projects/<int:project_id>/ratings/', ProjectRatingListView.as_view(), name='project-ratings'),

    # Comments
    path('projects/<int:project_id>/comments/', CommentListCreateView.as_view(), name='project-comments'),
    path('projects/comments/<int:pk>/delete/', CommentDeleteView.as_view(), name='delete-comment'),

    # Categories
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
]



















