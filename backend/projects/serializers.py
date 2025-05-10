# projects/serializers.py

from rest_framework import serializers
from .models import Project, Rating, Comment, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProjectSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='user.username', read_only=True)
    average_rating = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'materials', 'steps', 'user',
            'created_at', 'owner_username', 'average_rating', 'category', 'category_name'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'owner_username', 'average_rating', 'category_name']

    def get_average_rating(self, obj):
        return obj.average_rating()

class RatingSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'project', 'user', 'user_username', 'score', 'created_at']
        read_only_fields = ['id', 'user', 'created_at', 'project']

class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'project', 'user', 'user_username', 'text', 'created_at', 'is_owner']
        read_only_fields = ['id', 'user', 'created_at', 'project', 'user_username', 'is_owner']

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return obj.user == request.user if request else False





