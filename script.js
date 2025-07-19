document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('post-form');
  const input = document.getElementById('post-input');
  const feed = document.getElementById('feed');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = input.value.trim();
    if (content) {
      const post = document.createElement('div');
      post.className = 'post';
      post.textContent = content;
      feed.prepend(post);
      input.value = '';
    }
  });
});
