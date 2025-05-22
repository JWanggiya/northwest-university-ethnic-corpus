document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('upload-form');
  const statusMessage = document.getElementById('status-message');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 收集表单数据
    const formData = {
      title: document.getElementById('title').value,
      initial: document.getElementById('initial').value,
      content: document.getElementById('content').value,
      image: document.getElementById('image').value || '',
      video: document.getElementById('video').value || ''
    };
    
    // 显示加载状态
    statusMessage.textContent = '正在提交...';
    statusMessage.className = 'status-message loading';
    
    try {
      // 提交数据到 GitHub Actions
      const response = await fetch('https://api.github.com/repos/你的用户名/northwest-university-ethnic-corpus/dispatches', {
        method: 'POST',
        headers: {
          'Authorization': 'token 你的个人访问令牌',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'upload-entry',
          client_payload: formData
        })
      });
      
      if (response.ok) {
        statusMessage.textContent = '提交成功！GitHub Actions 正在处理您的请求。';
        statusMessage.className = 'status-message success';
        form.reset();
      } else {
        throw new Error('提交失败：' + response.statusText);
      }
    } catch (error) {
      statusMessage.textContent = '错误：' + error.message;
      statusMessage.className = 'status-message error';
    }
  });
});

