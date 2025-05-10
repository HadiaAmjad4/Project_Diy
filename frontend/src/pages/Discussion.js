// src/pages/Discussion.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Discussion.css';

function Discussion() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const COMMENTS_PER_PAGE = 3;

  useEffect(() => {
    fetchComments();
  }, [refresh]);

  const fetchComments = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projects/${id}/comments/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!Array.isArray(response.data.results)) {
        setError('Unexpected server response.');
        setComments([]);
        return;
      }

      setComments(response.data.results);
      setCurrentPage(0);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Failed to load comments.');
      }
      setComments([]);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(
        `http://127.0.0.1:8000/api/projects/${id}/comments/`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setNewComment('');
      setRefresh(!refresh);
    } catch (err) {
      setError('Failed to post your comment.');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`http://127.0.0.1:8000/api/projects/comments/${commentId}/delete/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRefresh(!refresh);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const paginatedComments = comments.slice(
    currentPage * COMMENTS_PER_PAGE,
    (currentPage + 1) * COMMENTS_PER_PAGE
  );

  return (
    <div className="discussion-container">
      <h2>💬 Project Discussion</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          rows="3"
          required
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>

      <div className="comment-list">
        {comments.length === 0 ? (
          <p>No comments yet. Start the conversation!</p>
        ) : (
          paginatedComments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-meta">
                <strong>{comment.user_username}</strong> •{' '}
                {new Date(comment.created_at).toLocaleDateString()}
              </div>
              <p>{comment.text}</p>
              {comment.is_owner && (
                <span
                  className="delete-text"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 0}
          >
            &lt;
          </button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default Discussion;
