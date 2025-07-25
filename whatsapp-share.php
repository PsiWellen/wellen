<?php
// Este arquivo php precisa ser colocado na raiz do domínio psiwellen.com.br

// Obtém a URL completa atual
$currentUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

// Verifica se a requisição vem do WhatsApp (verificando o user agent)
$userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
$isWhatsApp = (strpos($userAgent, 'WhatsApp') !== false);

// Se for uma requisição do WhatsApp e não houver parâmetro de redirecionamento
if ($isWhatsApp && !isset($_GET['redirected'])) {
  // Adiciona o parâmetro de redirecionamento para evitar loops
  $redirectUrl = $currentUrl . (strpos($currentUrl, '?') !== false ? '&' : '?') . 'redirected=true';
  
  // Adiciona cabeçalhos para garantir que o WhatsApp veja a imagem correta
  header('Content-Type: text/html; charset=utf-8');
  
  echo '<!DOCTYPE html>
<html>
<head>
    <title>Psicóloga Wellen Crystine - Psicanalista | Atendimento Online</title>
    <meta property="og:title" content="Psicóloga Wellen Crystine - Psicanalista | Atendimento Online" />
    <meta property="og:description" content="Psicóloga especializada em saúde mental da mulher negra, relações raciais e abordagem psicanalítica. Atendimento online para todo Brasil." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="' . htmlspecialchars($currentUrl) . '" />
    <meta property="og:image" content="https://psiwellen.github.io/wellen/assets/share-preview.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image" content="https://psiwellen.com.br/assets/share-preview.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta http-equiv="refresh" content="0;url=' . htmlspecialchars($redirectUrl) . '">
</head>
<body>
    <p>Redirecionando...</p>
</body>
</html>';
  exit;
}

// Caso contrário, continua com o processamento normal da página
// ...
?>
