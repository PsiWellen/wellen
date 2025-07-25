// Este script específico garante que o WhatsApp use a imagem correta para todos os links
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se o usuário veio do WhatsApp
  const isFromWhatsApp = navigator.userAgent.includes('WhatsApp');
  const currentUrl = window.location.href;
  
  // Se for do WhatsApp e não tiver o parâmetro de redirecionamento
  if (isFromWhatsApp && !currentUrl.includes('redirected=true')) {
    console.log('Acesso via WhatsApp detectado, otimizando meta tags');
    
    // Força atualização da imagem específica para WhatsApp
    document.querySelectorAll('meta[property="og:image"], meta[property="whatsapp:image"]').forEach(tag => {
      tag.setAttribute('content', 'https://psiwellen.com.br/assets/share-preview.jpg');
    });
    
    // Adiciona meta tags dinâmicas para ambos os domínios
    ['https://psiwellen.com.br/', 'https://www.psiwellen.com.br/'].forEach(domain => {
      if (!document.querySelector(`meta[property="og:see_also"][content="${domain}"]`)) {
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('property', 'og:see_also');
        metaTag.setAttribute('content', domain);
        document.head.appendChild(metaTag);
      }
    });
  }
  
  // Intercepta todos os cliques em links que possam ser compartilhados
  document.addEventListener('click', function(e) {
    // Se o elemento clicado for um link com href
    let link = e.target.closest('a[href]');
    if (link) {
      // Se o link pertence ao mesmo domínio
      const href = link.getAttribute('href');
      if (href.startsWith('/') || href.includes('psiwellen.com.br')) {
        // Adiciona atributos de dados para melhorar o compartilhamento no WhatsApp
        link.setAttribute('data-action', 'share/whatsapp/share');
        
        // Configura a imagem de compartilhamento como atributo de dados
        if (!link.hasAttribute('data-image')) {
          link.setAttribute('data-image', 'https://psiwellen.com.br/assets/share-preview.jpg');
        }
      }
    }
  });
});
