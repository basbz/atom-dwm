
function create_pane() {

}

function main(subscriptions) {
  console.log('main');

  atom.commands.add('atom-workspace', {
    'atom-dwm:create-pane': create_pane
  });
}

module.exports =  {
  activate: main
};
