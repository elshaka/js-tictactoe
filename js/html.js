const boardToHTML = (board) => board.reduce((html, box, index) => `
  ${html}<div class="box" data-number="${index}">${box || '-'}</div>
  `, '');

export default boardToHTML;
