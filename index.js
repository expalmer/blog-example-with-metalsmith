var Metalsmith   = require('metalsmith');
var collections  = require('metalsmith-collections');
var markdown     = require('metalsmith-markdown');
var templates    = require('metalsmith-templates');
var permalinks   = require('metalsmith-permalinks');
var tags         = require('metalsmith-tags');
var gist         = require('metalsmith-gist');
var drafts       = require('metalsmith-drafts');
var pagination   = require('metalsmith-pagination'); // <-- nova dependência

var fs           = require('fs');
var Handlebars   = require('handlebars');
var moment       = require('moment');
var baseUrl      = 'http://expalmer.github.io/react-progress-form';

Handlebars.registerPartial({
  'header': fs.readFileSync('./templates/partials/header.hbt').toString(),
  'footer': fs.readFileSync('./templates/partials/footer.hbt').toString()
});
Handlebars.registerHelper('baseUrl', function() {
  return baseUrl;
});
Handlebars.registerHelper('dateFormat', function( context ) {
  return moment(context).format("LL");
});
Handlebars.registerHelper('dateGMT', function( context ) {
  context = context === 'new' ? new Date() : context;
  return context.toGMTString();
});
// helpers para marcar a página corrente
Handlebars.registerHelper('currentPage', function( current, page ) {
  return current === page ? 'current' : '';
});

Metalsmith(__dirname)
  .use(drafts())
  .use(collections({
      posts: {
          pattern: 'posts/*.md',
          sortBy: 'date',
          reverse: true
      }
  }))
  .use(markdown())
  .use(permalinks({
      pattern: ':title',
      relative: false
  }))
  // detalhe: o pagination usa o ``collection`` e por isso deve ser chamado após o mesmo.
  // outro detalhe: nós estamos usando também o ``permalinks`` que altera o nome das páginas,
  //                portanto precisamos declarar o pagination após ele também.
  .use(pagination({
    'collections.posts': {  // aqui vai o nome da collection, no nosso caso, collections.posts
      perPage: 2, // por página
      template: 'indexWithPagination.hbt', // o template
      first: 'index.html', // ele cria um index.html na raiz com a primeira página
      path: ':num/index.html' // modelo de como quer que sejam criadas as demais páginas
    }
  }))
  .use(gist())
  .use(tags({
    handle: 'tags',
    template:'tags.hbt',
    path:'tags',
    sortBy: 'title',
    reverse: true
  }))
  .use(templates('handlebars'))
  .destination('./build')
  .build(function(err, files) {
    if (err) { throw err; }
  });