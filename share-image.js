// Este script garante que as meta tags de compartilhamento sejam consistentes em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
  // URL da imagem de compartilhamento
  const shareImageUrl = 'https://psiwellen.com.br/assets/share-preview.jpg';
  
  // Verificar se já existem meta tags og:image, caso contrário criar
  if (!document.querySelector('meta[property="og:image"]')) {
    const ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', shareImageUrl);
    document.head.appendChild(ogImage);
  } else {
    // Atualizar meta tag existente
    document.querySelector('meta[property="og:image"]').setAttribute('content', shareImageUrl);
  }
  
  // Garantir que as dimensões da imagem estão definidas
  if (!document.querySelector('meta[property="og:image:width"]')) {
    const ogImageWidth = document.createElement('meta');
    ogImageWidth.setAttribute('property', 'og:image:width');
    ogImageWidth.setAttribute('content', '1200');
    document.head.appendChild(ogImageWidth);
  }
  
  if (!document.querySelector('meta[property="og:image:height"]')) {
    const ogImageHeight = document.createElement('meta');
    ogImageHeight.setAttribute('property', 'og:image:height');
    ogImageHeight.setAttribute('content', '630');
    document.head.appendChild(ogImageHeight);
  }

  // WhatsApp specific meta (também utilizará as tags OpenGraph)
  if (!document.querySelector('meta[property="whatsapp:image"]')) {
    const waImage = document.createElement('meta');
    waImage.setAttribute('property', 'whatsapp:image');
    waImage.setAttribute('content', shareImageUrl);
    document.head.appendChild(waImage);
  }
  
  // Atualizar a URL canônica e a og:url para incluir ambos os domínios
  // Isso ajuda serviços como WhatsApp a reconhecer que ambos os domínios são o mesmo site
  const currentUrl = window.location.href;
  
  // Atualizar a meta tag og:url para refletir a URL atual
  if (document.querySelector('meta[property="og:url"]')) {
    document.querySelector('meta[property="og:url"]').setAttribute('content', currentUrl);
  } else {
    const ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', currentUrl);
    document.head.appendChild(ogUrl);
  }
  
  // Adicionar meta tags alternativas para ambos os domínios
  const domains = [
    'https://psiwellen.com.br/',
    'https://www.psiwellen.com.br/'
  ];
  
  // Adicionar link alternativo para cada domínio
  domains.forEach(domain => {
    // Não adicionar o domínio atual novamente
    if (!currentUrl.startsWith(domain)) {
      const altLink = document.createElement('link');
      altLink.setAttribute('rel', 'alternate');
      altLink.setAttribute('href', domain);
      document.head.appendChild(altLink);
    }
  });
});
