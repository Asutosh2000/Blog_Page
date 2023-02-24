import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
    updatePost(where: { id: $id }, data: { title: $title, content: $content }) {
      id
      title
      content
    }
  }
`;

function PostForm({ post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updatePost({
        variables: { id: post.id, title, content },
      });
      alert('Post updated!');
    } catch (error) {
      alert(`Error updating post: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <button type="submit">Update Post</button>
    </form>
  );
}

export default PostForm