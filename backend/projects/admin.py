# Projects/admin.py

from django.contrib import admin
from .models import Project, Rating, Comment, Category

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'created_at')
    search_fields = ('title', 'description', 'user__username')
    list_filter = ('created_at',)

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'user', 'score', 'created_at')
    search_fields = ('project__title', 'user__username')
    list_filter = ('score', 'created_at')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'user', 'created_at')
    search_fields = ('text', 'user__username', 'project__title')
    list_filter = ('created_at',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
