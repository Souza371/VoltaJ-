# Volta do Intervalo — Protótipo

Pequeno app web (protótipo) para calcular a hora exata de retorno do intervalo.

Características
- Insira a data/hora em que você bateu o ponto ao sair.
- Escolha a duração do intervalo (15, 30, 45, 60, 90, 120 minutos) ou informe um valor personalizado.
- Veja a hora exata para bater o ponto novamente e uma contagem regressiva ao vivo.
- Responsivo: funciona em desktop, tablet e celular. Feito com HTML, Tailwind (CDN) e vanilla JS.

Como usar
1. Abra `index.html` em qualquer navegador moderno (desktop ou celular).
2. O botão "Agora" preenche o campo com o horário atual.
3. Escolha a duração do intervalo ou selecione "Personalizado" e informe minutos.
4. Clique em "Calcular" para ver o horário de retorno e a contagem regressiva.
5. Use "Copiar" para copiar a hora exata.

Rodar localmente
- Simples: abra `index.html` no navegador.
- Alternativa (recomendada em alguns navegadores para evitar restrições de arquivo):

  python3 -m http.server 8000

e abra http://localhost:8000

Notas e próximos passos
- Melhorias possíveis:
  - PWA (instalar no celular) e notificações Push/Notification API.
  - Salvar múltiplos horários de saída e históricos.
  - Integração com calendários ou sistemas de ponto.
  - Temas (claro/escuro) e sons de alerta.

Assunções
- O protótipo assume que o intervalo é um período contínuo após a hora informada.
- Caso seu fluxo de trabalho exija regras mais complexas (ex.: arredondamento de minutos, regras por contrato), eu posso adaptar a lógica.

Contato
Se quiser, eu posso converter esse protótipo para React/Vue, transformá-lo em PWA com notificações, ou adicionar integração com back-end para salvar históricos.
# VoltaJ-
VoltaJá - Seu calculador de intervalos inteligente Never perca a hora de voltar do almoço! Basta inserir sua saída e o VoltaJá calcula automaticamente quando você deve retornar.
